// Purchases for real money through Bridge. PRODUCTS is what the game sells and what each product gives;
// every id must also be created in the platform console and listed in public/playgama-bridge-config.json.
// Prices are never written here: the shop shows them from getCatalog(); a product missing from the catalog
// is not shown. Where the platform has no payments (or off a platform in a release) the shop section is hidden,
// and everything in the game can be reached without paying.
//
// One idempotent handler serves a new purchase and the restore at start:
//   paid receipt → known product id and transaction id → not in the journal yet →
//   grant + journal entry in one profile change → wait until the storage accepted it →
//   consumePurchase(productId) for consumables → save again.
// Not accepted by the storage: nothing is consumed, the purchase stays for the next try.
// Client-side dedup only: there is no server receipt check, and two devices buying at once are not atomic.

import { reactive } from 'vue'
import type { Meta } from '../meta/Meta'
import { bridge, onRealPlatform } from './bridge'

export interface ProductDef {
  consumable: boolean
  gives: { gems?: number; gold?: number; noAds?: boolean }
}

// Approved by the owner (03.11, GDD 6.1): gem packs, a one-time starter pack, no interstitials.
export const PRODUCTS: Record<string, ProductDef> = {
  gems_small: { consumable: true, gives: { gems: 500 } },
  gems_medium: { consumable: true, gives: { gems: 1600 } },
  gems_big: { consumable: true, gives: { gems: 5000 } },
  starter_pack: { consumable: false, gives: { gems: 1000, gold: 10000 } },
  no_ads: { consumable: false, gives: { noAds: true } },
}

/** Reactive state for the shop. */
export const shopState = reactive({ busy: false, pending: false, tick: 0 })

let meta: Meta | null = null
export function setPaymentsProfile(m: Meta): void {
  meta = m
}

/** Dev only: without a platform, purchases are simulated (granted at once) to try the shop. Never in a release. */
const devShop = () => import.meta.env.DEV && !onRealPlatform()

/** Payments are taken here and now (asked each time: the QA Tool sets it after start). */
export function paymentsAvailable(): boolean {
  if (devShop()) return true
  const b = bridge()
  return !!b && onRealPlatform() && b.payments.isSupported
}

export interface CatalogItem {
  id: string
  price: string
  icon?: string
}
let catalog: Promise<Map<string, CatalogItem>> | null = null

/** The catalog, asked once per session (again after a failure). */
export function cachedCatalog(): Promise<Map<string, CatalogItem>> {
  catalog ??= loadCatalog().catch((e) => {
    catalog = null
    throw e
  })
  return catalog
}

async function loadCatalog(): Promise<Map<string, CatalogItem>> {
  const out = new Map<string, CatalogItem>()
  if (devShop()) {
    for (const id of Object.keys(PRODUCTS)) out.set(id, { id, price: 'DEV' })
    return out
  }
  if (!paymentsAvailable()) return out
  const list = (await bridge()!.payments.getCatalog()) as Record<string, unknown>[]
  for (const p of list) {
    const id = productId(p)
    if (!id || !PRODUCTS[id]) continue
    const price = p.price ?? (p.priceValue != null ? `${p.priceValue} ${p.priceCurrencyCode ?? ''}` : '')
    // Yandex: the portal currency picture comes with the product (it changes with the Currency mock).
    const icon = typeof p.priceCurrencyImage === 'string' ? p.priceCurrencyImage : undefined
    out.set(id, { id, price: String(price).trim(), icon })
  }
  return out
}

/** The product id: the QA Tool and some platforms give raw purchase data without `id`. */
export function productId(p: Record<string, unknown>): string {
  const nested = (o: unknown) => (o && typeof o === 'object' ? (o as Record<string, unknown>) : {})
  const v = p.id ?? p.productId ?? p.product_id ?? p.productID ?? nested(p.product).id ?? nested(p.purchaseData).productId ?? nested(p.purchaseData).product_id
  return typeof v === 'string' ? v : ''
}

function transactionId(p: Record<string, unknown>): string {
  const v = p.purchaseToken ?? p.token ?? p.transactionId ?? p.orderId ?? p.purchaseId ?? p.paymentId
  return typeof v === 'string' || typeof v === 'number' ? String(v) : ''
}

export function owns(id: string): boolean {
  return !!meta?.owns(id)
}

/** Grants one paid purchase once. Returns true when it is (or already was) granted and finished. */
async function handle(p: Record<string, unknown>): Promise<boolean> {
  const b = bridge()
  const id = productId(p)
  const def = PRODUCTS[id]
  if (!b || !def || !meta) {
    console.warn('[payments] unknown product, left as is', p)
    return false
  }
  if (!def.consumable) {
    // A permanent product: owning it is the grant; it is never consumed.
    meta.grantPurchase(`${id}:owned`, def.gives, id)
    return meta.flushConfirmed()
  }
  const tx = transactionId(p)
  if (!tx) {
    console.warn('[payments] consumable without a transaction id, left as is', p)
    return false
  }
  meta.grantPurchase(`${id}:${tx}`, def.gives, null)
  if (!(await meta.flushConfirmed())) {
    shopState.pending = true // the storage did not take it: do not consume, try again later
    return false
  }
  await b.payments.consumePurchase(id)
  await meta.flushConfirmed()
  return true
}

let queue: Promise<unknown> = Promise.resolve()
function enqueue<T>(job: () => Promise<T>, fallback: T): Promise<T> {
  const next = queue.then(job).catch((e) => {
    console.warn('[payments]', e)
    return fallback
  })
  queue = next
  return next
}

/** At start (after the profile is loaded) and on retry: finish purchases paid but not granted or consumed. */
export function restorePurchases(): Promise<void> {
  if (!paymentsAvailable() || devShop()) return Promise.resolve()
  return enqueue(async () => {
    const list = (await bridge()!.payments.getPurchases()) as Record<string, unknown>[]
    let ok = true
    for (const p of list) ok = (await handle(p).catch(() => false)) && ok
    shopState.pending = !ok && list.some((p) => PRODUCTS[productId(p)]?.consumable)
    shopState.tick++
  }, undefined)
}

/** Buys a product. Cancel or error grants nothing; a permanent product already owned is not sold again. */
export function buy(id: string): Promise<boolean> {
  const def = PRODUCTS[id]
  if (!paymentsAvailable() || !def || !meta || shopState.busy) return Promise.resolve(false)
  shopState.busy = true
  const m = meta
  return enqueue(async () => {
    if (devShop()) {
      if (!def.consumable && m.owns(id)) return false
      m.grantPurchase(def.consumable ? `${id}:dev${Date.now()}` : `${id}:owned`, def.gives, def.consumable ? null : id)
      return true
    }
    if (!def.consumable) {
      // Ask the platform again before selling a permanent product (it may be restored from another device).
      const list = (await bridge()!.payments.getPurchases()) as Record<string, unknown>[]
      if (m.owns(id) || list.some((p) => productId(p) === id)) {
        await handle({ id })
        return false
      }
    }
    const p = (await bridge()!.payments.purchase(id)) as Record<string, unknown>
    return handle({ id, ...p })
  }, false).finally(() => {
    shopState.busy = false
    shopState.tick++
  })
}
