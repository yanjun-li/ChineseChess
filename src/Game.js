import * as Chesses from './Chess'
import * as utils from './utils'
import Point from './Point'
import ChessBoard from './ChessBoard'
import {RULES} from './rules'

export class Game {
  constructor (id = 'chess', {width = 500, height = 500} = {}) {
    this.id = id
    this.width = width
    this.height = height
  }
  init () {
    let chessList = []
    let canvas = this.createCanvasEle()
    let board = this.createBoard(this.id)
    board.render()
    RULES.initChesses.forEach(val => {
      let chess = this.createChesses(val)
      chessList.push(chess)
      chess.render(board)
    })

    let clickHandler = function (event) {
      let pixelPos = utils.getCanvasPos(event, this.id)
      let clickChess = chessList.find(chess => {
        let distance = chess.distanceTo(pixelPos)
        return distance <= board.interval
      })
      console.log(clickChess.name)
    }.bind(null)
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
  createChesses (...data) {
    let chessType = RULES.roles[7 - data[1]]
    let point = new Point(data[2], data[3])
    let [color, role] = [data[0], data[1]]

    let chess = new Chesses[chessType](color, role, point)
    return chess
  }
}
