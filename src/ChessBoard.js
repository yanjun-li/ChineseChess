import {Config} from './config'
// import { isContext } from 'vm';
export default class ChessBoard {
  constructor (id, {interval = Config.BoardConfig.interval, offset = Config.BoardConfig.offset} = {}) {
    this.id = id
    this.interval = interval
    this.offset = offset
    this.canvas = document.getElementById(this.id)
  }
  renderCompatibility (ctx){
    let width = ctx.canvas.width
    let height = ctx.canvas.height
    if(window.devicePixelRatio){
      ctx.canvas.style.width = width + 'px'
      ctx.canvas.style.height = height + 'px'
      ctx.canvas.width = width * window.devicePixelRatio
      ctx.canvas.height = height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
  }
  render () {
    let ctx = this.canvas.getContext('2d')
    this.renderCompatibility(ctx)
    ctx.translate(this.offset.x, this.offset.y)
    // 内部网格
    for (let j = 0; j < 9; j++) {
      if (j !== 4) {
        for (let i = 0; i < 8; i++) {
          ctx.strokeRect(i * this.interval, j * this.interval, this.interval, this.interval)
        }
      }
    }
    // 最外边框
    ctx.save()
    ctx.beginPath()
    // ctx.lineWidth = 3
    ctx.strokeRect(0, 0, 8 * this.interval, 9 * this.interval)
    ctx.restore()

    // 棋子标线
    let littleOffset = this.interval / 10
    let lineWidth = this.interval / 3

    let leftArr = [[1, 2], [7, 2], [2, 3], [4, 3], [6, 3], [1, 7], [7, 7], [2, 6], [4, 6], [6, 6], [8, 3], [8, 6]]
    let rigthArr = [[1, 2], [7, 2], [2, 3], [4, 3], [6, 3], [1, 7], [7, 7], [2, 6], [4, 6], [6, 6], [0, 3], [0, 6]]
    leftArr.forEach(val => {
      ctx.save()
      ctx.translate(val[0] * this.interval, val[1] * this.interval)
      ctx.lineJoin = 'round'
      for (let i = 0; i < 2; i++) {
        ctx.save()

        ctx.rotate(Math.PI / 2 * i + Math.PI / 2)
        ctx.beginPath()
        ctx.moveTo(littleOffset, lineWidth)
        ctx.lineTo(littleOffset, littleOffset)
        ctx.lineTo(lineWidth, littleOffset)
        ctx.stroke()

        ctx.restore()
      }
      ctx.restore()
    })
    rigthArr.forEach(val => {
      ctx.save()
      ctx.translate(val[0] * this.interval, val[1] * this.interval)
      ctx.lineJoin = 'round'
      for (let i = 0; i < 2; i++) {
        ctx.save()

        ctx.rotate(Math.PI / 2 * i - Math.PI / 2)
        ctx.beginPath()
        ctx.moveTo(littleOffset, lineWidth)
        ctx.lineTo(littleOffset, littleOffset)
        ctx.lineTo(lineWidth, littleOffset)
        ctx.stroke()

        ctx.restore()
      }
      ctx.restore()
    })
    // 九宫交叉线
    ctx.beginPath()
    ctx.moveTo(3 * this.interval, 0 * this.interval)
    ctx.lineTo(5 * this.interval, 2 * this.interval)

    ctx.moveTo(5 * this.interval, 0 * this.interval)
    ctx.lineTo(3 * this.interval, 2 * this.interval)

    ctx.moveTo(3 * this.interval, 9 * this.interval)
    ctx.lineTo(5 * this.interval, 7 * this.interval)

    ctx.moveTo(5 * this.interval, 9 * this.interval)
    ctx.lineTo(3 * this.interval, 7 * this.interval)
    ctx.stroke()

    // 楚河&&汉界
    ctx.font = '20px 微软雅黑 serif'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'red'
    ctx.save()

    ctx.translate(1.5 * this.interval, 4 * this.interval + 3 * this.interval / 4)
    ctx.rotate(3 * Math.PI / 2)

    ctx.fillText('楚', 0, 0)
    ctx.restore()
    ctx.save()

    ctx.translate(2.5 * this.interval, 4 * this.interval + 3 * this.interval / 4)
    ctx.rotate(3 * Math.PI / 2)
    ctx.fillText('河', 0, 0)
    ctx.restore()
    ctx.save()

    ctx.translate(5.5 * this.interval, 4 * this.interval + 1 * this.interval / 4)
    ctx.rotate(Math.PI / 2)
    ctx.fillText('汉', 0, 0)
    ctx.restore()
    ctx.save()

    ctx.translate(6.5 * this.interval, 4 * this.interval + 1 * this.interval / 4)
    ctx.rotate(Math.PI / 2)
    ctx.fillText('界', 0, 0)
    ctx.restore()
  }
}
