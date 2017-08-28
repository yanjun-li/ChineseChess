export class Game {
  constructor (id = 'chess', {width = 500, height = 500} = {}) {
    this.id = id
    this.width = width
    this.height = height
  }
  init () {
    this.createCanvasEle()
  }
  createCanvasEle () {
    let canvasEle = document.createElement('canvas')
    canvasEle.id = this.id
    canvasEle.width = this.width
    canvasEle.height = this.height
    document.body.appendChild(canvasEle)
  }
}
