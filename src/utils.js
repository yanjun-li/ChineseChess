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
 function getCanvasPos (e, id) {
   let canvas = $(id)
   let rect = canvas.getBoundingClientRect()
   let [left, top] = [rect.left, rect.top]
   let {x, y} = {x: e.pageX - left, y: e.pageY - top}
   return {x, y}
 }
 function posToPixel (pos) {
  //   {x, y} = {x:pos.x * interval,y: pos.y * interval}
  //  return {x,y}
 }
 export {deepFreeze, getCanvasPos, posToPixel, $}
