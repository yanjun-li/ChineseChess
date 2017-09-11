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
  distanceTo (point) {
    let dx = this.x - point.x
    let dy = this.y - point.y
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
  }
  equals (point) {
    return this.x === point.x && this.y === point.y
  }
  toString () {
    return `(${this.x},${this.y})`
  }
}
