// Uniform grid of linked lists over the arena: fast "who is near this point" for hundreds of enemies.
export class SpatialGrid {
  private readonly head: Int32Array
  private readonly next: Int32Array
  private readonly cols: number
  private readonly rows: number

  constructor(
    private readonly width: number,
    private readonly height: number,
    private readonly cell: number,
    maxItems: number,
  ) {
    this.cols = Math.ceil(width / cell)
    this.rows = Math.ceil(height / cell)
    this.head = new Int32Array(this.cols * this.rows)
    this.next = new Int32Array(maxItems)
  }

  clear(): void {
    this.head.fill(-1)
  }

  insert(index: number, x: number, y: number): void {
    const c = this.col(x) + this.row(y) * this.cols
    this.next[index] = this.head[c]
    this.head[c] = index
  }

  forEachNear(x: number, y: number, radius: number, fn: (index: number) => void): void {
    const c0 = this.col(x - radius)
    const c1 = this.col(x + radius)
    const r0 = this.row(y - radius)
    const r1 = this.row(y + radius)
    for (let r = r0; r <= r1; r++) {
      for (let c = c0; c <= c1; c++) {
        for (let i = this.head[c + r * this.cols]; i !== -1; i = this.next[i]) fn(i)
      }
    }
  }

  private col(x: number): number {
    return Math.min(this.cols - 1, Math.max(0, Math.floor((x + this.width / 2) / this.cell)))
  }

  private row(y: number): number {
    return Math.min(this.rows - 1, Math.max(0, Math.floor((y + this.height / 2) / this.cell)))
  }
}
