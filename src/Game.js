import * as Chesses from './Chess'
import * as utils from './utils'
import Point from './Point'
import ChessBoard from './ChessBoard'
import {Config} from './config'

export class Game {
  constructor (id = 'chess', {width = 500, height = 500} = {}) {
    this.id = id
    this.width = width
    this.height = height

    this.board = null
    this.chessList = []
    this.currentColor = Config.Color.RED
    this.activeChess = null
  }
  init () {
    let canvas = this.createCanvasEle()
    this.board = this.createBoard(this.id)
    this.board.render()

    Config.initChesses.forEach(val => {
      let chess = this.createChesses(val)
      this.chessList.push(chess)
      chess.render(this.board)
    })

    // 棋盘点击响应函数
    let clickHandler = function (event) {
      let pixelPos = utils.getCanvasPos(event, this.id)
      let clickChess = this.chessList
        .find(chess => {
          return chess.isInChess(pixelPos)
        })

      if (this.activeChess) {
        // 准备行棋
        if (clickChess) {
          // 点击了棋子
          if (clickChess.color === this.currentColor) {
            // 换个棋子行棋
            this.activeChess.isActive = false
            clickChess.isActive = true
            this.activeChess = clickChess
          } else {
            // 被吃
            clickChess.isDefeated = true
            this.activeChess.moveChessTo(clickChess.point)
          }
        } else {
          // 未点击棋子
          let newPoint = utils.pixel2Point(pixelPos)
          if (newPoint) {
            this.activeChess.moveChessTo(newPoint)
            this.activeChess.isActive = false
            this.activeChess = null
          }
        }
      } else {
        // 未准备行棋
        if (clickChess) {
          // 点击了棋子
          if (clickChess.color !== this.currentColor) {
            alert(`此时应该是${this.currentColor === 1 ? '红' : '黑'}方行棋`)
          } else {
            clickChess.isActive = true
            this.activeChess = clickChess
          }
        }
      }

      this.update()
    }.bind(this)
    canvas.addEventListener('click', clickHandler)
  }
  createCanvasEle () {
    let canvasEle = document.createElement('canvas')
    canvasEle.id = this.id
    canvasEle.width = this.width
    canvasEle.height = this.height
    document.body.appendChild(canvasEle)
    return canvasEle
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
  update () {
    this.chessList.forEach(chess => {
      chess.render(this.board)
    })
  }
}
