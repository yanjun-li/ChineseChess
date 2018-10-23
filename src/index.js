import './style/style.css'

import {Game} from './Game'

let chessGame = new Game()

chessGame.init()

if(process.env.NODE_ENV === 'production') {
    console.log('当前为prod环境!');
} else {
    console.log('当前为dev环境');
}
