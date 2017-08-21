import _ from 'lodash'
// import printMe from './print'
import './style.css'

function createCanvas (id) {
  // printMe()
  // let htmlStr = `<canvas id="${id}"></canvas>`
  let canvasEle = document.createElement('canvas')
  canvasEle.id = id
  canvasEle.width = 500
  canvasEle.height = 500
  document.body.appendChild(canvasEle)
}

createCanvas('chessboard')

function renderChessBoard () {
  let interval = 40
  let offset = 30
  let littleOffset = interval / 10
  const canvas = document.getElementById('chessboard')
  let ctx = canvas.getContext('2d')
  // 内部网格
  for (let j = 0; j < 9; j++) {
    if (j !== 4) {
      for (let i = 0; i < 8; i++) {
        ctx.strokeRect(offset + i * interval, offset + j * interval, interval, interval)
      }
    }
  }
  // 内部网格线条
  ctx.beginPath()
  ctx.moveTo(offset + 3 * interval, offset + 0 * interval)
  ctx.lineTo(offset + 5 * interval, offset + 2 * interval)

  ctx.moveTo(offset + 5 * interval, offset + 0 * interval)
  ctx.lineTo(offset + 3 * interval, offset + 2 * interval)

  ctx.moveTo(offset + 3 * interval, offset + 9 * interval)
  ctx.lineTo(offset + 5 * interval, offset + 7 * interval)

  ctx.moveTo(offset + 5 * interval, offset + 9 * interval)
  ctx.lineTo(offset + 3 * interval, offset + 7 * interval)
  ctx.stroke()
  // 内部线条
  ctx.save()
  ctx.translate(offset + 1 * interval, offset + 2 * interval)
  ctx.lineJoin = 'round'
  for (let i = 0; i < 4; i++) {
    ctx.save()

    ctx.rotate(Math.PI / 2 * i)
    ctx.beginPath()
    ctx.moveTo(littleOffset, interval / 2)
    ctx.lineTo(littleOffset, littleOffset)
    ctx.lineTo(interval / 2, littleOffset)
    ctx.stroke()

    ctx.restore()
  }
  ctx.restore()

  ctx.save()
  ctx.translate(offset + 7 * interval, offset + 2 * interval)
  for (let i = 0; i < 4; i++) {
    ctx.save()

    ctx.rotate(Math.PI / 2 * i)
    ctx.beginPath()
    ctx.moveTo(littleOffset, interval / 2)
    ctx.lineTo(littleOffset, littleOffset)
    ctx.lineTo(interval / 2, littleOffset)
    ctx.stroke()

    ctx.restore()
  }
  ctx.restore()

  ctx.save()
  ctx.translate(offset + 1 * interval, offset + 7 * interval)
  for (let i = 0; i < 4; i++) {
    ctx.save()

    ctx.rotate(Math.PI / 2 * i)
    ctx.beginPath()
    ctx.moveTo(littleOffset, interval / 2)
    ctx.lineTo(littleOffset, littleOffset)
    ctx.lineTo(interval / 2, littleOffset)
    ctx.stroke()

    ctx.restore()
  }
  ctx.restore()

  ctx.save()
  ctx.translate(offset + 7 * interval, offset + 7 * interval)
  for (let i = 0; i < 4; i++) {
    ctx.save()

    ctx.rotate(Math.PI / 2 * i)
    ctx.beginPath()
    ctx.moveTo(littleOffset, interval / 2)
    ctx.lineTo(littleOffset, littleOffset)
    ctx.lineTo(interval / 2, littleOffset)
    ctx.stroke()

    ctx.restore()
  }
  ctx.restore()

  // 最外边框
  ctx.restore()
  ctx.lineWidth = 4
  ctx.srtokeStyle = '#000'
  ctx.strokeRect(offset, offset, interval * 8, interval * 9)
  // 文字
  ctx.font = '20px serif'
  ctx.save()

  ctx.translate(offset + 2 * interval, offset + 4 * interval + 3 * interval / 4)
  ctx.rotate(3 * Math.PI / 2)
  ctx.textBaseline = 'top'
  ctx.fillText('楚', 0, 0)
  ctx.restore()
  ctx.save()

  ctx.translate(offset + 3 * interval, offset + 4 * interval + 3 * interval / 4)
  ctx.rotate(3 * Math.PI / 2)
  ctx.fillText('河', 0, 0)
  ctx.restore()
  ctx.save()

  ctx.translate(offset + 5 * interval, offset + 4 * interval + 1 * interval / 4)
  ctx.rotate(Math.PI / 2)
  ctx.fillText('汉', 0, 0)
  ctx.restore()
  ctx.save()

  ctx.translate(offset + 6 * interval, offset + 4 * interval + 1 * interval / 4)
  ctx.rotate(Math.PI / 2)
  ctx.fillText('界', 0, 0)
  ctx.restore()
}

renderChessBoard()
