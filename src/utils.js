 import {Config} from './config'
 import Point from './Point'

 function $ (id) {
   return document.getElementById(id)
 }

 function deepFreeze (o) {
   var prop, propKey
   Object.freeze(o) // 首先冻结第一层对象.
   for (propKey in o) {
     prop = o[propKey]
     if (!o.hasOwnProperty(propKey) || !(typeof prop === 'object') || Object.isFrozen(prop)) {
      // 跳过原型链上的属性和已冻结的对象.
       continue
     }

     deepFreeze(prop) // 递归调用.
   }
 }
 /**
  * 获取原始原点的canvas pixel crood
  *
  * @param {EventTarget} e
  * @param {String} id
  * @returns {Object} {x,y}
  */
 function getCanvasPos (e, id) {
   let canvas = $(id)
   let rect = canvas.getBoundingClientRect()
   let [left, top] = [rect.left, rect.top]
   let {x, y} = {x: e.pageX - left, y: e.pageY - top}
   return {x, y}
 }
/**
 * 根据棋盘点返回canva pixel 坐标值
 *
 * @param {Point} point
 * @returns {Object} {x,y}
 */
 function point2Pixel (point) {
   let config = Config.BoardConfig

   let {x, y} = {x: point.x * config.interval + config.offsetX, y: point.y * config.interval + config.offsetY}
   return {x, y}
 }

 /**
  * 如果点击处离棋盘网格点坐标的距离在 tolerance 内返回Point
  * ，否则返回false
  * @param {num} x canvas pixel coord X
  * @param {num} y canvas pixel coord Y
  * @returns {Point} 返回棋盘网格坐标
  */
 function pixel2Point (x, y) {
   const TOL = 0.25
   let config = Config.BoardConfig
  // 坐标原点偏移后的坐標
   x = (x - config.offsetX) / config.interval
   y = (y - config.offsetY) / config.interval

   let px = Math.round(x)
   let py = Math.round(y)
   let dx = Math.abs(x - px)
   let dy = Math.abs(y - py)
   if (dx < TOL && dy < TOL) {
     return new Point(px, py)
   } else {
     return null
   }
 }
 export {deepFreeze, getCanvasPos, point2Pixel, pixel2Point, $}
