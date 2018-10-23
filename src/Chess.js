import {Config} from './config'
import Point from './Point'

let Color = ['black', 'red']
class Chess {
  constructor (color, role, point) {
    this.role = role
    this.color = color
    this.name = Config.ChessName[(7 - role) + color * 7]
    this.radius = Config.BoardConfig.interval / 2 * 0.9
    this.point = point
    this.board = null
    this.game = null
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
    if (this.isDefeated) {
      return 0
    }
    let gray = 'rgb(238, 238, 238)'
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
    ctx.fillStyle = gray
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
    ctx.fillStyle = Color[this.color]
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
  moveTo (point) {
    this.point = point
  }
}

class General extends Chess {
  canGo (point) {
    let dx = point.x - this.point.x
    let dy = point.y - this.point.y
    let distance = this.point.distanceTo(point)
    // 移动
    if (this.color === Config.Color.RED) {
      if (distance === 1 && point.x > 2 && point.x < 6 && point.y > 6) {
        return true
      }
    } else {
      if (distance === 1 && point.x > 2 && point.x < 6 && point.y < 3) {
        return true
      }
    }
    // 吃对方将
    let rltChess = this.game.findChess(point)
    let absY = Math.abs(dy)
    if (rltChess.role === 7) {
      if (distance > 1 && dx === 0) {
        for (let i = 1; i < Math.abs(dy); i++) {
          let blockPoint = new Point(this.point.x, this.point.y + dy * i / absY)
          if (this.game.findChess(blockPoint)) {
            return false
          }
        }
        return true
      }
    }
  }
}

class Guard extends Chess {
  canGo (point) {
    if (this.color === Config.Color.RED) {
      if (point.y < 7) {
        return false
      }
    } else {
      if (point.y > 2) {
        return false
      }
    }
    if (point.x < 3 || point.x > 5) {
      return false
    }
    if (this.point.distanceTo(point) === Math.SQRT2) {
      return true
    }
  }
}
class Bishop extends Chess {
  canGo (point) {
    let dx = point.x - this.point.x
    let dy = point.y - this.point.y
    if (this.color === Config.Color.RED) {
      if (point.y < 5) {
        return false
      }
    } else {
      if (point.y > 4) {
        return false
      }
    }
    let blockPoint = new Point(this.point.x + dx / 2, this.point.y + dy / 2)
    if (this.game.findChess(blockPoint)) {
      return false
    }
    if (dx * dy !== 0 && this.point.distanceTo(point) === Math.sqrt(8)) {
      return true
    }
  }
}
class Knight extends Chess {
  canGo (point) {
    let dx = point.x - this.point.x
    let dy = point.y - this.point.y
    let absX = Math.abs(dx)
    let absY = Math.abs(dy)

    if (dx * dy !== 0 || absX + absY === 0) {
      return false
    }

    if (absX > 0) {
      for (let i = 1; i < absX; i++) {
        let blockPoint = new Point(this.point.x + dx * i / absX, this.point.y)
        if (this.game.findChess(blockPoint)) {
          return false
        }
      }
    } else {
      for (let i = 1; i < absY; i++) {
        let blockPoint = new Point(this.point.x, this.point.y + dy * i / absY)
        if (this.game.findChess(blockPoint)) {
          return false
        }
      }
    }

    return true
  }
}
class Rook extends Chess {
  canGo (point) {
    let dx = point.x - this.point.x
    let dy = point.y - this.point.y
    // 是否符合行棋规则
    if (dx * dy === 0 || this.point.distanceTo(point) !== Math.sqrt(5)) {
      return false
    }
    // 是否拌马腿
    let bx, by
    if (Math.abs(dx) === 2) {
      bx = this.point.x + dx / 2
      by = this.point.y
    } else {
      bx = this.point.x
      by = this.point.y + dy / 2
    }
    let blockPoint = new Point(bx, by)

    if (this.game.findChess(blockPoint)) {
      return false
    }
    return true
  }
}
class Cannon extends Chess {
  canGo (point) {
    let dx = point.x - this.point.x
    let dy = point.y - this.point.y
    let absX = Math.abs(dx)
    let absY = Math.abs(dy)

    if (dx * dy !== 0 || absX + absY === 0) {
      return false
    }
    // 吃棋
    let rltChess = this.game.findChess(point)
    if (rltChess && rltChess.color !== this.game.currentColor) {
      if (absX > 0) {
        for (let i = 1; i < absX; i++) {
          let blockPoint = new Point(this.point.x + dx * i / absX, this.point.y)
          if (!this.game.findChess(blockPoint)) {
            return false
          }
        }
      } else {
        for (let i = 1; i < absY; i++) {
          let blockPoint = new Point(this.point.x, this.point.y + dy * i / absY)
          if (!this.game.findChess(blockPoint)) {
            return false
          }
        }
      }
    } else {
      if (absX > 0) {
        for (let i = 1; i < absX; i++) {
          let blockPoint = new Point(this.point.x + dx * i / absX, this.point.y)
          if (this.game.findChess(blockPoint)) {
            return false
          }
        }
      } else {
        for (let i = 1; i < absY; i++) {
          let blockPoint = new Point(this.point.x, this.point.y + dy * i / absY)
          if (this.game.findChess(blockPoint)) {
            return false
          }
        }
      }
    }
    return true
  }
}
class Pawn extends Chess {
  canGo (point) {
    let dx = point.x - this.point.x
    let dy = point.y - this.point.y
    let distance = this.point.distanceTo(point)
    if (this.color === Config.Color.RED) {
      // 未过河
      if (this.point.y > 4 && dx === 0 && dy === -1) {
        return true
      }
      // 过河
      if (this.point.y <= 4 && distance === 1 && (dx === 1 || dx === -1 || dy === -1)) {
        return true
      }
    } else {
      if (this.point.y < 5 && dx === 0 && dy === 1) {
        return true
      }
      // 过河
      if (this.point.y >= 5 && distance === 1 && (dx === 1 || dx === -1 || dy === 1)) {
        return true
      }
    }
  }
}

export {General, Guard, Bishop, Knight, Rook, Cannon, Pawn}
