export default class Point {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
  move (dx, dy) {
    this.x += dx
    this.y += dy
  }
  moveTo (x, y) {
    this.x = x
    this.y = y
  }
  equals (point) {
    return this.x === point.x && this.y === point.y
  }
  toString () {
    return `(${this.x},${this.y})`
  }
}
