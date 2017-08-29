export class Chess {
  constructor (name, color, pos) {
    this.name = name
    this.color = color
    this.pos = pos
  }

  render (board) {
    const interval = board.interval
    const canvas = board.canvas
    const radius = interval / 2 * 0.9
    let x = this.pos[0] * interval
    let y = this.pos[1] * interval
    let ctx = canvas.getContext('2d')

    ctx.save()
    ctx.lineWidth = 2

    ctx.strokeStyle = '#000'
    ctx.fillStyle = 'rgb(238, 238, 238)'
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()

    ctx.restore()
    ctx.font = '22px serif'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = this.color
    var text = ctx.measureText(this.name)
    ctx.translate(x - text.width / 2, y)
    ctx.fillText(this.name, 0, 0)
  }
}
