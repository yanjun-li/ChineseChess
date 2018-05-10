import * as Chesses from './Chess'
import * as utils from './utils'

import ChessBoard from './ChessBoard'
import {Config} from './config'
import Point from './Point'

export class Game {
  constructor (id = 'chess', {width = 500, height = 500} = {}) {
    this.id = id
    this.width = width
    this.height = height

    this.canvas = null
    this.board = null
    this._chessList = []
    this.currentColor = Config.Color.BLACK
    this.activeChess = null
  }
  get chessList () {
    return this._chessList.filter(chess => {
      return chess.isDefeated === false
    })
  }
  init () {
    this.canvas = this.createCanvasEle()
    this.board = this.createBoard(this.id)
    this.board.render()

    Config.initChesses.forEach(val => {
      let chess = this.createChesses(val)
      chess.game = this
      this._chessList.push(chess)
      chess.render(this.board)
    })

    // 棋盘点击响应函数
    let clickHandler = function (event) {
      let pixelPos = utils.getCanvasPos(event, this.id)
      if (!this.isInBoard(pixelPos)) {
        return false
      }
      let newPoint = utils.pixel2Point(pixelPos)
      let clickChess = this.chessList
        .find(chess => {
          return chess.isInChess(pixelPos)
        })
      // 行棋
      if (this.activeChess && (!clickChess || clickChess.color !== this.currentColor)) {
        let point = null
        if (clickChess && clickChess.color !== this.currentColor) {
          point = clickChess.point
        } else if (newPoint) {
          point = newPoint
        }
        if (this.chickValid(point) && this.activeChess.canGo(point)) {
          this.moveChess(this.activeChess, point)
          this.moveEnd()
          this.update()
          this.isGameOver()
          return true
        } else {
          console.log('不可行至此处！')
        }
      }
      /* attention: 多入口条件语句，改变另一入口条件状态的不可写在前边,或者进入分支后直接return退出 */
      // 选定行棋棋子
      if (clickChess) {
        if (clickChess.color === this.currentColor) {
          this.setActiveChess(clickChess)
          this.update()
          return true
        } else if (!this.activeChess) {
          console.log(`此时应该是${this.currentColor === Config.Color.RED ? '红' : '黑'}方行棋`)
        }
      }
    }.bind(this)
    this.canvas.addEventListener('click', clickHandler)
  }
  createCanvasEle () {
    let canvasEle = document.createElement('canvas')
    canvasEle.id = this.id
    canvasEle.width = this.width
    canvasEle.height = this.height
    document.body.appendChild(canvasEle)
    return canvasEle
  }
  clearCanvas () {
    let offset = this.board.offset
    let ctx = this.canvas.getContext('2d')
    ctx.translate(-offset.x, -offset.y)
    ctx.clearRect(0, 0, this.width, this.height)
  }
  createBoard (id) {
    let board = new ChessBoard(id)
    return board
  }
  createChesses (data) {
    let chessType = Config.roles[7 - data[1]]
    let point = new Point(data[2], data[3])
    let [color, role] = [data[0], data[1]]

    let chess = new Chesses[chessType](color, role, point)
    return chess
  }
  setActiveChess (chess) {
    if (this.activeChess) {
      this.activeChess.isActive = false
    }
    chess.isActive = true
    this.activeChess = chess
  }
  moveChess (mChess, point) {
    let occupyChess = this.chessList.find(chess => {
      return chess.point.equals(point)
    })
    if (!occupyChess) {
      mChess.moveTo(point)
    } else if (occupyChess.color !== this.currentColor) {
      occupyChess.isDefeated = true
      mChess.moveTo(point)
    }
  }
  update () {
    this.clearCanvas()
    this.board.render()
    this.chessList.forEach(chess => {
      chess.render(this.board)
    })
    // this.isGameOver()
  }
  moveEnd () {
    this.activeChess.isActive = false
    this.activeChess = null
    this.switchPlayer()
  }
  switchPlayer () {
    if (this.currentColor === Config.Color.RED) {
      this.currentColor = Config.Color.BLACK
    } else {
      this.currentColor = Config.Color.RED
    }
    this.showMsg(`${this.currentColor}方行棋！`)
  }
  // 检查是否有我方棋子阻挡
  chickValid (point) {
    let occupyChess = this.chessList.find(chess => {
      return chess.point.equals(point)
    })
    if (!occupyChess || occupyChess.color !== this.currentColor) {
      return true
    } else {
      return false
    }
  }
  findChess (point) {
    let rltChess = this.chessList.find(chess => {
      return chess.point.equals(point)
    })
    return rltChess || false
  }
  isInBoard (pos) {
    let bool = true
    let minX = this.board.offset.x
    let minY = this.board.offset.y
    let maxX = this.board.offset.x + 8 * this.board.interval
    let maxY = this.board.offset.y + 9 * this.board.interval

    if (pos.x < minX || pos.x > maxX || pos.y < minY || pos.y > maxY) {
      bool = false
    }
    return bool
  }
  isGameOver () {
    let loser = this._chessList.find(chess => {
      return chess.role === 7 && chess.isDefeated
    })
    if (loser) {
      let color = loser.color === Config.Color.RED ? '红' : '黑'
      console.log(`${color}方获得胜利！`)
      this.showMsg(`${color}方获得胜利！`)
    }
  }
  showMsg (msg) {
    document.getElementById('game-info').innerHTML = msg
  }
}
