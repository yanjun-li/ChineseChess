import _ from 'lodash'
import printMe from './print'
import './style.css'

function createCanvas (id) {
  printMe()
  // let htmlStr = `<canvas id="${id}"></canvas>`
  let canvasEle = document.createElement('canvas')
  canvasEle.id = id
  document.body.appendChild(canvasEle)
}

createCanvas('chessboard')
