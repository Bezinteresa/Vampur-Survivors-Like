import * as THREE from 'three'
import { ARENA_H, ARENA_W, BOLT_LIFE, HALF_H, HALF_W, SWING_LIFE, type World } from './World'

// Placeholder look: flat circles with a dark outline, drawn as instanced meshes (one draw call per kind).
// Sprites from the art pipeline will replace these materials later.

const VIEW_W = 560 // world units visible across the screen width
const MAX_ENEMIES = 1000
const MAX_PROJECTILES = 1500
const MAX_PICKUPS = 500
const MAX_MARKERS = 300
const MAX_SWINGS = 12
const MAX_MECH = 64
const MAX_BOLT_SEGMENTS = 128
const SWORD_ARC = 2.1

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

  private readonly enemyOutline: THREE.InstancedMesh
  private readonly enemyBody: THREE.InstancedMesh
  private readonly projectiles: THREE.InstancedMesh
  private readonly pickups: THREE.InstancedMesh
  private readonly markers: THREE.InstancedMesh
  private readonly mechOutline: THREE.InstancedMesh
  private readonly mechBody: THREE.InstancedMesh
  private readonly player = new THREE.Group()
  private readonly playerBody: THREE.Mesh<THREE.CircleGeometry, THREE.MeshBasicMaterial>
  private readonly playerGun: THREE.Mesh
  private readonly swings: THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial>[] = []
  private readonly bolts: THREE.LineSegments<THREE.BufferGeometry, THREE.LineBasicMaterial>

  constructor(host: HTMLElement) {
    this.gl = new THREE.WebGLRenderer({ antialias: true })
    this.gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    host.appendChild(this.gl.domElement)
    this.scene.background = new THREE.Color(0x1b2019)

    this.scene.add(this.makeGround())

    const circle = new THREE.CircleGeometry(1, 24)
    this.enemyOutline = this.instanced(circle, MAX_ENEMIES, 0x15181a, false)
    this.enemyBody = this.instanced(circle, MAX_ENEMIES, 0xffffff, true)
    this.projectiles = this.instanced(new THREE.CircleGeometry(1, 10), MAX_PROJECTILES, 0xffe066, false)
    this.pickups = this.instanced(new THREE.CircleGeometry(1, 4), MAX_PICKUPS, 0x9ad14f, false)
    this.markers = this.instanced(new THREE.RingGeometry(0.6, 1, 20), MAX_MARKERS, 0xe04848, false)
    const square = new THREE.PlaneGeometry(2, 2)
    this.mechOutline = this.instanced(square, MAX_MECH, 0x15181a, false)
    this.mechBody = this.instanced(square, MAX_MECH, 0xffffff, true)
    ;(this.markers.material as THREE.MeshBasicMaterial).transparent = true
    ;(this.markers.material as THREE.MeshBasicMaterial).opacity = 0.75

    const outline = new THREE.Mesh(new THREE.CircleGeometry(19, 28), new THREE.MeshBasicMaterial({ color: 0x15181a }))
    this.playerBody = new THREE.Mesh(new THREE.CircleGeometry(16, 28), new THREE.MeshBasicMaterial({ color: 0xe8c170, transparent: true }))
    this.playerBody.position.z = 0.01
    this.playerGun = new THREE.Mesh(new THREE.PlaneGeometry(16, 7), new THREE.MeshBasicMaterial({ color: 0x2b2f33 }))
    this.playerGun.position.z = 0.02
    this.player.add(outline, this.playerBody, this.playerGun)
    this.player.position.z = Z.player
    this.scene.add(this.player)

    const arc = new THREE.RingGeometry(0.45, 1, 20, 1, -SWORD_ARC / 2, SWORD_ARC)
    for (let i = 0; i < MAX_SWINGS; i++) {
      const s = new THREE.Mesh(arc, new THREE.MeshBasicMaterial({ color: 0xf2f2f2, transparent: true }))
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
    const fa = Math.atan2(p.fy, p.fx)
    this.playerGun.rotation.z = fa
    this.playerGun.position.x = Math.cos(fa) * 16
    this.playerGun.position.y = Math.sin(fa) * 16

    this.drawEnemies(world, time)
    this.drawMech(world)

    let n = 0
    for (const pr of world.projectiles) {
      this.place(this.projectiles, n++, pr.x, pr.y, pr.r, Z.projectile)
    }
    this.finish(this.projectiles, n)

    n = 0
    for (const pk of world.pickups) {
      this.place(this.pickups, n++, pk.x, pk.y, pk.value > 2 ? 10 : 7, Z.pickup)
    }
    this.finish(this.pickups, n)

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

  private drawEnemies(world: World, time: number): void {
    let n = 0
    for (const e of world.enemies) {
      if (e.hp <= 0) continue
      this.place(this.enemyOutline, n, e.x, e.y, e.r + 3, Z.outline)
      this.place(this.enemyBody, n, e.x, e.y, e.r, Z.enemy)
      this.c.setHex(e.def.color)
      if (e.state === 'windup') this.c.lerp(this.red, 0.5 + 0.5 * Math.sin(time * 30))
      if (e.flash > 0) this.c.lerp(this.white, 0.75)
      this.enemyBody.setColorAt(n, this.c)
      n++
    }
    this.finish(this.enemyOutline, n)
    this.finish(this.enemyBody, n)
    if (this.enemyBody.instanceColor) this.enemyBody.instanceColor.needsUpdate = true
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

  private makeGround(): THREE.Mesh {
    const size = 256
    const cv = document.createElement('canvas')
    cv.width = cv.height = size
    const g = cv.getContext('2d')!
    g.fillStyle = '#56644d'
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
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(ARENA_W, ARENA_H), new THREE.MeshBasicMaterial({ map: tex }))
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
}

// Camera follows the hero and stops a little past the arena edge, so the border stays visible.
const EDGE_MARGIN = 50

function followClamp(v: number, half: number, viewHalf: number): number {
  const limit = half + EDGE_MARGIN - viewHalf
  if (limit <= 0) return 0
  return Math.max(-limit, Math.min(limit, v))
}
