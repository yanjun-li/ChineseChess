let utils = {
  deepFreeze (obj) {
    Object.freeze(obj)
    Object.keys(obj).forEach(item => {
      if (typeof item === 'object') {
        deepFreeze(obj[item])
      }
    })
  }
}
export default utils
