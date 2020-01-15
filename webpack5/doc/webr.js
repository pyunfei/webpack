function r(obj) {
  Object.defineProperty(obj, Symbol.toStringTag, {
    value: 'Module',
    enumerable: true
  });
  Object.defineProperty(obj, '__esModule', {
    value: true,
    enumerable: true
  })
}

const obj = {}
r(obj)
console.log(obj)