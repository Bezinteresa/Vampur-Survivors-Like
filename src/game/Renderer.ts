import * as THREE from 'three'
import { SPRITE, hasSprite, spriteTexture, walkFrame } from '../sprites'
import { ARENA_H, ARENA_W, BOLT_LIFE, CHEST_RADIUS, HALF_H, HALF_W, SWING_LIFE, beamAngle, type Enemy, type World } from './World'

// Placeholder look: flat circles with a dark outline, drawn as instanced meshes (one draw call per kind).
// When the art pipeline has a picture for something (public/sprites), it is drawn instead of the placeholder:
// one instanced quad per picture, tinted the same way the circles are.

const VIEW_W = 560 // world units visible across the screen width
const MAX_ENEMIES = 1000
const MAX_PROJECTILES = 1500
const MAX_PICKUPS = 500
const MAX_MARKERS = 300
const MAX_SWINGS = 12
const MAX_MECH = 64
const MAX_HOSTILES = 600
const MAX_BEAMS = 40
const MAX_PUDDLES = 200
const MAX_BOLT_SEGMENTS = 128
const SWORD_ARC = 2.1
const SPRITE_SCALE = 2.6 // picture size relative to the enemy radius (pictures have margins)
const WEAPON_RING = 30 // weapons hover this far around the hero
const WEAPON_SIZE = 30
const KIND_COLOR = { melee: 0xd8dde3, bullet: 0x6a5a4a, magic: 0x9a6ad0, mech: 0xb08a4a }

const Z = { ground: 0, pickup: 1, marker: 1.5, outline: 2, enemy: 2.1, player: 3, projectile: 4, fx: 5 }

export class Renderer {
  private readonly gl: THREE.WebGLRenderer
  private readonly scene = new THREE.Scene()
  private readonly camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -10, 10)
  private viewH = 1000
  private readonly m = new THREE.Matrix4()
  private readonly c = new THREE.Color()
  private readonly white = new THREE.Color(0xffffff)
  private readonly red = new THREE.Color(0xff5050)
  private readonly burnColor = new THREE.Color(0xff8a3d)
  private readonly freezeColor = new THREE.Color(0x9fdcff)
  private readonly chargeColor = new THREE.Color(0xfff2a0)
  private readonly shieldColor = new THREE.Color(0x9a7aff)
  private readonly bleedColor = new THREE.Color(0xb0203a)

  private readonly enemyOutline: THREE.InstancedMesh
  private readonly enemyBody: THREE.InstancedMesh
  private readonly projectiles: THREE.InstancedMesh
  private readonly pickups: THREE.InstancedMesh
  private readonly markers: THREE.InstancedMesh
  private readonly mechOutline: THREE.InstancedMesh
  private readonly mechBody: THREE.InstancedMesh
  private readonly player = new THREE.Group()
  private readonly playerBody: THREE.Mesh<THREE.CircleGeometry, THREE.MeshBasicMaterial>
  private readonly weaponBars: THREE.InstancedMesh // placeholder weapons until their pictures exist
  private readonly q = new THREE.Quaternion()
  private readonly zAxis = new THREE.Vector3(0, 0, 1)
  private readonly v = new THREE.Vector3()
  private readonly sv = new THREE.Vector3()
  private readonly weaponAim: number[] = [] // smoothed aim per slot
  private readonly swings: THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial>[] = []
  private readonly arcGeo = new THREE.RingGeometry(0.45, 1, 20, 1, -SWORD_ARC / 2, SWORD_ARC)
  private readonly circleGeo = new THREE.RingGeometry(0.85, 1, 40)
  private readonly bolts: THREE.LineSegments<THREE.BufferGeometry, THREE.LineBasicMaterial>
  private readonly chest = new THREE.Group()
  private readonly hostiles: THREE.InstancedMesh
  private readonly puddles: THREE.InstancedMesh
  private readonly beams: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[] = []
  private readonly ground: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>
  private readonly chestRing: THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial>
  private readonly chestBox = new THREE.Group()
  private readonly chestSprite: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>
  private readonly playerShape = new THREE.Group()
  private readonly heroSprite: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>
  private readonly batches = new Map<string, { mesh: THREE.InstancedMesh; n: number }>()
  private readonly mobFiles = new Map<string, string | null>()
  private locationId = ''
  private heroFile = ''

  constructor(host: HTMLElement) {
    this.gl = new THREE.WebGLRenderer({ antialias: true })
    this.gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    host.appendChild(this.gl.domElement)
    this.scene.background = new THREE.Color(0x1b2019)

    this.ground = this.makeGround()
    this.scene.add(this.ground)
    this.puddles = this.instanced(new THREE.CircleGeometry(1, 28), MAX_PUDDLES, 0xffffff, true)
    ;(this.puddles.material as THREE.MeshBasicMaterial).transparent = true
    ;(this.puddles.material as THREE.MeshBasicMaterial).opacity = 0.35
    this.hostiles = this.instanced(new THREE.CircleGeometry(1, 12), MAX_HOSTILES, 0xffffff, true)
    const beamGeo = new THREE.PlaneGeometry(1, 1)
    for (let i = 0; i < MAX_BEAMS; i++) {
      const b = new THREE.Mesh(beamGeo, new THREE.MeshBasicMaterial({ color: 0xff4040, transparent: true }))
      b.visible = false
      b.position.z = Z.fx - 0.1
      this.beams.push(b)
      this.scene.add(b)
    }

    const circle = new THREE.CircleGeometry(1, 24)
    this.enemyOutline = this.instanced(circle, MAX_ENEMIES, 0x15181a, false)
    this.enemyBody = this.instanced(circle, MAX_ENEMIES, 0xffffff, true)
    this.projectiles = this.instanced(new THREE.CircleGeometry(1, 10), MAX_PROJECTILES, 0xffffff, true)
    this.pickups = this.instanced(new THREE.CircleGeometry(1, 4), MAX_PICKUPS, 0xffffff, true)
    this.markers = this.instanced(new THREE.RingGeometry(0.6, 1, 20), MAX_MARKERS, 0xe04848, false)
    const square = new THREE.PlaneGeometry(2, 2)
    this.mechOutline = this.instanced(square, MAX_MECH, 0x15181a, false)
    this.mechBody = this.instanced(square, MAX_MECH, 0xffffff, true)
    this.weaponBars = this.instanced(new THREE.PlaneGeometry(1, 1), 8, 0xffffff, true)
    ;(this.markers.material as THREE.MeshBasicMaterial).transparent = true
    ;(this.markers.material as THREE.MeshBasicMaterial).opacity = 0.75

    const outline = new THREE.Mesh(new THREE.CircleGeometry(19, 28), new THREE.MeshBasicMaterial({ color: 0x15181a }))
    this.playerBody = new THREE.Mesh(new THREE.CircleGeometry(16, 28), new THREE.MeshBasicMaterial({ color: 0xe8c170, transparent: true }))
    this.playerBody.position.z = 0.01
    this.playerShape.add(outline, this.playerBody)
    this.heroSprite = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ transparent: true, alphaTest: 0.1, side: THREE.DoubleSide }))
    this.heroSprite.scale.set(52, 52, 1)
    this.heroSprite.position.set(0, 6, 0.03)
    this.heroSprite.visible = false
    this.player.add(this.playerShape, this.heroSprite)
    this.player.position.z = Z.player
    this.scene.add(this.player)

    for (let i = 0; i < MAX_SWINGS; i++) {
      const s = new THREE.Mesh(this.arcGeo, new THREE.MeshBasicMaterial({ color: 0xf2f2f2, transparent: true }))
      s.position.z = Z.fx
      s.visible = false
      this.swings.push(s)
      this.scene.add(s)
    }

    const boltGeo = new THREE.BufferGeometry()
    boltGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(MAX_BOLT_SEGMENTS * 6), 3))
    this.bolts = new THREE.LineSegments(boltGeo, new THREE.LineBasicMaterial({ color: 0x9fd8ff, transparent: true }))
    this.bolts.frustumCulled = false
    this.scene.add(this.bolts)

    // Supply chest: a box with a ring that fills while the hero stands inside.
    const track = new THREE.Mesh(new THREE.RingGeometry(CHEST_RADIUS - 6, CHEST_RADIUS, 48), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.18 }))
    this.chestRing = new THREE.Mesh(new THREE.RingGeometry(CHEST_RADIUS - 6, CHEST_RADIUS, 48, 1, Math.PI / 2, Math.PI * 2), new THREE.MeshBasicMaterial({ color: 0x7cd44a }))
    this.chestRing.position.z = 0.01
    const lid = new THREE.Mesh(new THREE.PlaneGeometry(40, 30), new THREE.MeshBasicMaterial({ color: 0x15181a }))
    const box = new THREE.Mesh(new THREE.PlaneGeometry(34, 24), new THREE.MeshBasicMaterial({ color: 0xb07a3a }))
    box.position.z = 0.02
    const band = new THREE.Mesh(new THREE.PlaneGeometry(34, 4), new THREE.MeshBasicMaterial({ color: 0xe8c170 }))
    band.position.z = 0.03
    this.chestBox.add(lid, box, band)
    this.chestSprite = new THREE.Mesh(new THREE.PlaneGeometry(56, 56), new THREE.MeshBasicMaterial({ transparent: true, alphaTest: 0.1 }))
    this.chestSprite.position.z = 0.04
    const chestTex = spriteTexture(SPRITE.supplyChest)
    if (chestTex) this.chestSprite.material.map = chestTex
    this.chestSprite.visible = !!chestTex
    this.chestBox.visible = !chestTex
    this.chest.add(track, this.chestRing, this.chestBox, this.chestSprite)
    this.chest.position.z = Z.marker
    this.chest.visible = false
    this.scene.add(this.chest)
  }

  resize(width: number, height: number): void {
    this.gl.setSize(width, height, false)
    this.viewH = (VIEW_W * height) / Math.max(1, width)
    this.camera.left = -VIEW_W / 2
    this.camera.right = VIEW_W / 2
    this.camera.top = this.viewH / 2
    this.camera.bottom = -this.viewH / 2
    this.camera.updateProjectionMatrix()
  }

  dispose(): void {
    this.gl.dispose()
    this.gl.domElement.remove()
  }

  render(world: World, time: number): void {
    const p = world.player
    this.camera.position.set(
      followClamp(p.x, HALF_W, VIEW_W / 2),
      followClamp(p.y, HALF_H, this.viewH / 2),
      5,
    )

    this.player.position.x = p.x
    this.player.position.y = p.y
    this.playerBody.material.opacity = p.rollT > 0 ? 0.45 : 1
    this.playerBody.material.color.setHex(p.hurt > 0 ? 0xff6b6b : 0xe8c170)
    if (this.heroSprite.visible) {
      const frame = spriteTexture(walkFrame(this.heroFile, time, p.moving && p.rollT <= 0))
      if (frame && this.heroSprite.material.map !== frame) {
        this.heroSprite.material.map = frame
        this.heroSprite.material.needsUpdate = true
      }
      // Hero pictures face right; turn with the movement.
      if (Math.abs(p.fx) > 0.2) this.heroSprite.scale.x = Math.abs(this.heroSprite.scale.x) * Math.sign(p.fx)
      this.heroSprite.material.opacity = p.rollT > 0 ? 0.55 : 1
      this.heroSprite.material.color.setHex(p.hurt > 0 ? 0xff8080 : 0xffffff)
      this.heroSprite.rotation.z = p.rollT > 0 ? -Math.sign(p.fx || 1) * (1 - p.rollT / 0.3) * Math.PI * 2 : 0
    }

    this.drawEnemies(world, time)
    this.drawWeapons(world)
    this.drawMech(world)
    this.drawHazards(world)

    let n = 0
    for (const pr of world.projectiles) {
      this.place(this.projectiles, n, pr.x, pr.y, pr.r, Z.projectile)
      const fx = pr.src.def.effect
      this.projectiles.setColorAt(n++, this.c.setHex(fx === 'burn' ? 0xff8a3d : fx === 'freeze' ? 0x9fdcff : fx === 'bleed' ? 0xe0405a : 0xffe066))
    }
    this.finish(this.projectiles, n)
    if (this.projectiles.instanceColor) this.projectiles.instanceColor.needsUpdate = true

    n = 0
    for (const pk of world.pickups) {
      const file = pk.medkit ? SPRITE.medkit : SPRITE.coin
      const size = pk.medkit ? 13 : pk.value > 2 ? 10 : 7
      if (this.drawSprite(file, pk.x, pk.y, size * 2.4, false, Z.pickup)) continue
      this.place(this.pickups, n, pk.x, pk.y, size, Z.pickup)
      this.pickups.setColorAt(n++, this.c.setHex(pk.medkit ? 0xe8484f : 0x9ad14f))
    }
    this.finish(this.pickups, n)
    if (this.pickups.instanceColor) this.pickups.instanceColor.needsUpdate = true
    this.finishSprites()

    const chest = world.chest
    this.chest.visible = !!chest
    if (chest) {
      this.chest.position.x = chest.x
      this.chest.position.y = chest.y
      // The ring geometry is built in segment order, so drawing a prefix of its indices shows the progress arc.
      this.chestRing.geometry.setDrawRange(0, 6 * Math.round(48 * Math.min(1, chest.progress)))
    }

    n = 0
    for (const mk of world.markers) {
      const r = (mk.defId === 'boss' ? 60 : 16) * (1 + 0.15 * Math.sin(time * 12))
      this.place(this.markers, n++, mk.x, mk.y, r, Z.marker)
    }
    this.finish(this.markers, n)

    for (let i = 0; i < this.swings.length; i++) {
      const mesh = this.swings[i]
      const s = world.swings[i]
      mesh.visible = !!s
      if (!s) continue
      mesh.position.x = s.x
      mesh.position.y = s.y
      mesh.geometry = s.full ? this.circleGeo : this.arcGeo
      mesh.rotation.z = s.angle
      mesh.scale.setScalar(s.range)
      mesh.material.opacity = 0.7 * (1 - s.t / SWING_LIFE)
    }

    const pos = this.bolts.geometry.getAttribute('position') as THREE.BufferAttribute
    let seg = 0
    for (const b of world.bolts) {
      for (let i = 0; i + 3 < b.pts.length && seg < MAX_BOLT_SEGMENTS; i += 4, seg++) {
        pos.setXYZ(seg * 2, b.pts[i], b.pts[i + 1], Z.fx)
        pos.setXYZ(seg * 2 + 1, b.pts[i + 2], b.pts[i + 3], Z.fx)
      }
    }
    pos.needsUpdate = true
    this.bolts.geometry.setDrawRange(0, seg * 2)
    this.bolts.material.opacity = world.bolts.length ? 1 - world.bolts[0].t / BOLT_LIFE : 0

    this.gl.render(this.scene, this.camera)
  }

  // ---------- pictures ----------

  setHero(id: string): void {
    this.heroFile = SPRITE.hero(id)
    const tex = spriteTexture(this.heroFile)
    this.heroSprite.visible = !!tex
    this.playerShape.visible = !tex
    if (tex) {
      this.heroSprite.material.map = tex
      this.heroSprite.material.needsUpdate = true
    }
  }

  // Floor of the location: the terrain picture when there is one, else a generated placeholder in its colour.
  setLocation(id: string, groundColor: string): void {
    this.locationId = id
    this.mobFiles.clear()
    const old = this.ground.material.map
    const tex = spriteTexture(SPRITE.terrain(id))
    if (tex) {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping
      tex.repeat.set(ARENA_W / 256, ARENA_H / 256)
      this.ground.material.map = tex
    } else {
      this.ground.material.map = this.groundTexture(groundColor)
    }
    this.ground.material.needsUpdate = true
    // Generated placeholder floors are ours to free; picture textures stay cached in sprites.ts.
    if (old instanceof THREE.CanvasTexture) old.dispose()
  }

  private mobFile(e: Enemy): string | null {
    let file = this.mobFiles.get(e.def.id)
    if (file === undefined) {
      const candidate = e.boss ? SPRITE.boss(this.locationId) : SPRITE.mob(e.def.id)
      file = hasSprite(candidate) ? candidate : null
      this.mobFiles.set(e.def.id, file)
    }
    return file
  }

  // Adds one picture instance this frame; false when that picture does not exist (draw the placeholder).
  private drawSprite(file: string, x: number, y: number, size: number, flip: boolean, z: number, tint?: THREE.Color, angle = 0, flipY = false): boolean {
    let b = this.batches.get(file)
    if (!b) {
      const tex = spriteTexture(file)
      if (!tex) return false
      const mesh = new THREE.InstancedMesh(
        new THREE.PlaneGeometry(1, 1),
        new THREE.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.1, side: THREE.DoubleSide }),
        MAX_ENEMIES,
      )
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
      mesh.frustumCulled = false
      mesh.setColorAt(0, this.white)
      mesh.count = 0
      this.scene.add(mesh)
      b = { mesh, n: 0 }
      this.batches.set(file, b)
    }
    if (b.n >= MAX_ENEMIES) return true
    this.q.setFromAxisAngle(this.zAxis, angle)
    this.m.compose(this.v.set(x, y, z), this.q, this.sv.set(flip ? -size : size, flipY ? -size : size, 1))
    b.mesh.setMatrixAt(b.n, this.m)
    b.mesh.setColorAt(b.n, tint ?? this.white)
    b.n++
    return true
  }

  private finishSprites(): void {
    for (const b of this.batches.values()) {
      b.mesh.count = b.n
      b.mesh.instanceMatrix.needsUpdate = true
      if (b.mesh.instanceColor) b.mesh.instanceColor.needsUpdate = true
      b.n = 0
    }
  }

  private drawEnemies(world: World, time: number): void {
    let n = 0
    const p = world.player
    for (const e of world.enemies) {
      if (e.hp <= 0) continue
      const file = this.mobFile(e)
      // Pictures start white (their own colours); placeholders start from the minion's colour.
      this.c.setHex(file ? 0xffffff : e.def.color)
      this.tintEnemy(e, time, !!file)
      // Pictures face left; turn toward the hero. Walking enemies step through their walk frames.
      const walking = e.state === 'move' || e.state === 'act'
      if (file && this.drawSprite(walkFrame(file, time, walking && e.speed > 0, e.id * 0.37), e.x, e.y, e.r * SPRITE_SCALE, p.x > e.x, Z.enemy + (e.boss ? 0.05 : 0), this.c)) continue
      this.place(this.enemyOutline, n, e.x, e.y, e.r + 3, Z.outline)
      this.place(this.enemyBody, n, e.x, e.y, e.r, Z.enemy)
      this.enemyBody.setColorAt(n, this.c)
      n++
    }
    this.finish(this.enemyOutline, n)
    this.finish(this.enemyBody, n)
    if (this.enemyBody.instanceColor) this.enemyBody.instanceColor.needsUpdate = true
  }

  // Weapons hover in a ring around the hero, each turned toward its last target (pictures point right).
  // Drones and turrets have their own bodies on the field, so they are not in the ring.
  private drawWeapons(world: World): void {
    const p = world.player
    const ring = world.weapons.filter((w) => w.def.behavior !== 'drone' && w.def.behavior !== 'turret')
    let bars = 0
    ring.forEach((w, i) => {
      const slotAngle = Math.PI / 2 + (i * Math.PI * 2) / Math.max(1, ring.length)
      const x = p.x + Math.cos(slotAngle) * WEAPON_RING
      const y = p.y + Math.sin(slotAngle) * WEAPON_RING * 0.8
      // Smooth turning, the short way round.
      const prev = this.weaponAim[i] ?? w.aim
      let d = w.aim - prev
      d = Math.atan2(Math.sin(d), Math.cos(d))
      const aim = (this.weaponAim[i] = prev + d * 0.35)
      // Keep the weapon upright when it points left: mirror it vertically instead of flipping it over.
      const left = Math.cos(aim) < 0
      if (this.drawSprite(SPRITE.weapon(w.def.id), x, y, WEAPON_SIZE, false, Z.player + 0.1, undefined, aim, left)) return
      this.q.setFromAxisAngle(this.zAxis, aim)
      this.m.compose(this.v.set(x, y, Z.player + 0.1), this.q, this.sv.set(22, 5, 1))
      this.weaponBars.setMatrixAt(bars, this.m)
      this.weaponBars.setColorAt(bars++, this.c.setHex(KIND_COLOR[w.def.kind]))
    })
    this.finish(this.weaponBars, bars)
    if (this.weaponBars.instanceColor) this.weaponBars.instanceColor.needsUpdate = true
  }

  private tintEnemy(e: Enemy, time: number, picture: boolean): void {
    // Charging an attack: the colour shifts to bright yellow; the boss also pulses red.
    if (e.charge > 0) this.c.lerp(this.chargeColor, Math.min(1, e.charge) * 0.8)
    if (e.boss && e.state === 'windup') this.c.lerp(this.red, 0.3 + 0.3 * Math.sin(time * 30))
    if (e.invulnerable) this.c.lerp(this.shieldColor, 0.5 + 0.2 * Math.sin(time * 8))
    if (e.freezeT > 0) this.c.lerp(this.freezeColor, 0.6)
    else if (e.burnT > 0) this.c.lerp(this.burnColor, 0.45)
    else if (e.bleedT > 0) this.c.lerp(this.bleedColor, 0.35)
    // A hit flashes a circle white; a picture (already white-based) flashes red.
    if (e.flash > 0) this.c.lerp(picture ? this.red : this.white, picture ? 0.5 : 0.75)
  }

  // Drones (small, light blue) and turrets (bigger, grey): placeholders for mechanical weapons.
  private drawMech(world: World): void {
    let n = 0
    const add = (x: number, y: number, size: number, color: number) => {
      if (n >= MAX_MECH) return
      this.place(this.mechOutline, n, x, y, size + 3, Z.player - 0.1)
      this.place(this.mechBody, n, x, y, size, Z.player - 0.05)
      this.mechBody.setColorAt(n, this.c.setHex(color))
      n++
    }
    for (const t of world.turrets) add(t.x, t.y, 12, 0x9aa1a8)
    for (const w of world.weapons) if (w.orbit) add(w.orbit.x, w.orbit.y, 8, 0x6fc3d8)
    this.finish(this.mechOutline, n)
    this.finish(this.mechBody, n)
    if (this.mechBody.instanceColor) this.mechBody.instanceColor.needsUpdate = true
  }

  private place(mesh: THREE.InstancedMesh, i: number, x: number, y: number, scale: number, z: number): void {
    this.m.makeScale(scale, scale, 1)
    this.m.setPosition(x, y, z)
    mesh.setMatrixAt(i, this.m)
  }

  private finish(mesh: THREE.InstancedMesh, count: number): void {
    mesh.count = count
    mesh.instanceMatrix.needsUpdate = true
  }

  private instanced(geo: THREE.BufferGeometry, max: number, color: number, perInstanceColor: boolean): THREE.InstancedMesh {
    const mesh = new THREE.InstancedMesh(geo, new THREE.MeshBasicMaterial({ color }), max)
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    mesh.frustumCulled = false
    if (perInstanceColor) mesh.setColorAt(0, this.white)
    mesh.count = 0
    this.scene.add(mesh)
    return mesh
  }

  private drawHazards(world: World): void {
    let n = 0
    for (const pd of world.puddles) {
      if (n >= MAX_PUDDLES) break
      this.place(this.puddles, n, pd.x, pd.y, pd.r, Z.pickup - 0.5)
      this.puddles.setColorAt(n++, this.c.setHex(pd.fire ? 0xff8a2a : 0x7ac943))
    }
    this.finish(this.puddles, n)
    if (this.puddles.instanceColor) this.puddles.instanceColor.needsUpdate = true

    n = 0
    for (const h of world.hostiles) {
      this.place(this.hostiles, n, h.x, h.y, h.r, Z.projectile + 0.1)
      this.hostiles.setColorAt(n++, this.c.setHex(h.turn > 0 ? 0xff9a3a : 0xff4a6a))
    }
    this.finish(this.hostiles, n)
    if (this.hostiles.instanceColor) this.hostiles.instanceColor.needsUpdate = true

    for (let i = 0; i < this.beams.length; i++) {
      const mesh = this.beams[i]
      const b = world.beams[i]
      mesh.visible = !!b
      if (!b) continue
      const a = beamAngle(b)
      const charging = b.t <= b.charge
      mesh.position.x = b.x + (Math.cos(a) * b.len) / 2
      mesh.position.y = b.y + (Math.sin(a) * b.len) / 2
      mesh.rotation.z = a
      mesh.scale.set(b.len, charging ? 3 : b.width, 1)
      mesh.material.color.setHex(charging ? 0xff4040 : 0xfff0c0)
      mesh.material.opacity = charging ? 0.25 + 0.4 * (b.t / b.charge) : 0.9
    }
  }

  private makeGround(): THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> {
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(ARENA_W, ARENA_H), new THREE.MeshBasicMaterial({ map: this.groundTexture('#56644d') }))
    ground.position.z = Z.ground
    const border = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-HALF_W, -HALF_H, 0.1),
        new THREE.Vector3(HALF_W, -HALF_H, 0.1),
        new THREE.Vector3(HALF_W, HALF_H, 0.1),
        new THREE.Vector3(-HALF_W, HALF_H, 0.1),
      ]),
      new THREE.LineBasicMaterial({ color: 0x0e110d }),
    )
    ground.add(border)
    return ground
  }

  private groundTexture(color: string): THREE.CanvasTexture {
    const size = 256
    const cv = document.createElement('canvas')
    cv.width = cv.height = size
    const g = cv.getContext('2d')!
    g.fillStyle = color
    g.fillRect(0, 0, size, size)
    let seed = 7
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
    for (let i = 0; i < 260; i++) {
      g.fillStyle = rnd() < 0.5 ? 'rgba(0,0,0,0.09)' : 'rgba(255,255,255,0.05)'
      g.fillRect(rnd() * size, rnd() * size, 2 + rnd() * 3, 2 + rnd() * 3)
    }
    g.strokeStyle = 'rgba(30,40,25,0.35)'
    g.lineWidth = 2
    for (let i = 0; i < 18; i++) {
      const x = rnd() * size
      const y = rnd() * size
      g.beginPath()
      g.moveTo(x, y)
      g.lineTo(x - 3, y - 7)
      g.moveTo(x + 3, y)
      g.lineTo(x + 5, y - 6)
      g.stroke()
    }
    const tex = new THREE.CanvasTexture(cv)
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(ARENA_W / size, ARENA_H / size)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }
}

// Camera follows the hero and stops a little past the arena edge, so the border stays visible.
const EDGE_MARGIN = 50

function followClamp(v: number, half: number, viewHalf: number): number {
  const limit = half + EDGE_MARGIN - viewHalf
  if (limit <= 0) return 0
  return Math.max(-limit, Math.min(limit, v))
}
