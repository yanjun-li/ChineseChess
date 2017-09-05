import {RULES} from './rules'

// import {posToPixel} from './utils'

export class Chess {
  constructor (color, role, {x = 0, y = 0} = {}) {
    this.role = role
    this.color = RULES.camps[color]
    this.name = RULES.ChessName[RULES.camps[color]][7 - role]
    this.pos = {x, y}
    this.board = null
  }

  render (board) {
    this.board = board
    const interval = board.interval
    const canvas = board.canvas
    const radius = interval / 2 * 0.9
    let x = this.pos.x * interval
    let y = this.pos.y * interval
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

    ctx.save()
    ctx.font = '22px serif'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = this.color
    var text = ctx.measureText(this.name)
    ctx.translate(x - text.width / 2, y)
    ctx.fillText(this.name, 0, 0)
    ctx.restore()
  }
  distanceTo (pos) {
    const interval = this.board.interval
    let x = this.pos.x * interval + interval
    let y = this.pos.y * interval + interval
    return Math.sqrt(Math.pow((pos.x - x), 2) + Math.pow((pos.y - y), 2))
  }
}

class General extends Chess {
  moveTo (pos) {
    this.pos = pos
  }
}

class Guard extends Chess {
  moveTo (pos) {
    this.pos = pos
  }
}
class Bishop extends Chess {
  moveTo (pos) {
    this.pos = pos
  }
}
class Knight extends Chess {
  moveTo (pos) {
    this.pos = pos
  }
}
class Rook extends Chess {
  moveTo (pos) {
    this.pos = pos
  }
}
class Cannon extends Chess {
  moveTo (pos) {
    this.pos = pos
  }
}
class Pawn extends Chess {
  moveTo (pos) {
    this.pos = pos
  }
}

export {General, Guard, Bishop, Knight, Rook, Cannon, Pawn}
