import {Config} from './config'
class Chess {
  constructor (color, role, point) {
    this.role = role
    this.color = color
    this.name = Config.ChessName[color.toString()][7 - role]
    this.radius = Config.BoardConfig.interval / 2 * 0.9
    this.point = point
    this.board = null

    // 状态
    this.isActive = false
    this.isDefeated = false
  }

/**
 * 画棋子
 *
 * @param {any} board 所属棋盘
 * @memberof Chess
 */
  render (board) {
    this.board = board
    const interval = board.interval
    const canvas = board.canvas

    let x = this.point.x * interval
    let y = this.point.y * interval
    let ctx = canvas.getContext('2d')
    // 画棋子外边和填充色
    ctx.save()
    ctx.lineWidth = 2
    ctx.strokeStyle = '#000'
    ctx.fillStyle = 'rgb(238, 238, 238)'
    ctx.beginPath()
    ctx.arc(x, y, this.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    // 画激活状态
    if (this.isActive) {
      ctx.beginPath()
      ctx.lineWidth = 1
      ctx.strokeStyle = 'red'
      ctx.arc(x, y, this.radius + 3, 0, Math.PI * 2)
      ctx.stroke()
    }

    // 画棋子名称
    ctx.font = '22px serif'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = this.color
    let text = ctx.measureText(this.name)
    ctx.translate(x - text.width / 2, y)
    ctx.fillText(this.name, 0, 0)
    ctx.restore()
  }
  // 获取棋子与点击处的距离
  distanceTo (pos) {
    const interval = this.board.interval
    let x = this.point.x * interval + interval
    let y = this.point.y * interval + interval
    return Math.sqrt(Math.pow((pos.x - x), 2) + Math.pow((pos.y - y), 2))
  }
  /**
   * 检测鼠标点是否在棋子上
   *
   * @param {any} pos
   * @return {Boolean} 是否点击在棋子上
   * @memberof Chess
   */
  isInChess (pos) {
    let interval = this.board.interval
    let offsetX = this.board.offset.x
    let offsetY = this.board.offset.y
    let x = this.point.x * interval + offsetX
    let y = this.point.y * interval + offsetY
    let distance = Math.sqrt(Math.pow((pos.x - x), 2) + Math.pow((pos.y - y), 2))
    return distance <= this.radius
  }
  moveChessTo (point) {
    this.point = point
  }
}

class General extends Chess {
  moveTo (pos) {
    this.point = pos
  }
  isValidPos (pos) {
    if (this.color === -1) {
      if (pos.x >= 3 && pos.x <= 5 && pos.y >= 0 && pos.y <= 2) {
        return true
      }
    } else {
      if (pos.x >= 3 && pos.x <= 5 && pos.y >= 7 && pos.y <= 9) {
        return true
      }
    }
    return false
  }
}

class Guard extends Chess {
  moveTo (pos) {
    this.point = pos
  }
}
class Bishop extends Chess {
  moveTo (pos) {
    this.point = pos
  }
}
class Knight extends Chess {
  moveTo (pos) {
    this.point = pos
  }
}
class Rook extends Chess {
  moveTo (pos) {
    this.point = pos
  }
}
class Cannon extends Chess {
  moveTo (pos) {
    this.point = pos
  }
}
class Pawn extends Chess {
  moveTo (pos) {
    this.point = pos
  }
}

export {General, Guard, Bishop, Knight, Rook, Cannon, Pawn}
