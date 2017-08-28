import './style.css'

import {Chess} from './Chess'
import {ChessBoard} from './ChessBoard'
import {Game} from './Game'

let chessGame = new Game()
chessGame.init()

let chessboard = new ChessBoard('chess')
chessboard.render()

let che = new Chess('車', 'red', [0, 0])
che.render(chessboard)
