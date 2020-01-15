// create a fake namespace object
// mode & 1: value is a module id, require it
// mode & 2: merge all properties of value into the ns
// mode & 4: return value when already ns object
// mode & 8|1: behave like require
// __webpack_require__.t = function (value, mode) {
//   if (mode & 1) value = __webpack_require__(value);
//   if (mode & 8) return value;
//   if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
//   var ns = Object.create(null);
//   __webpack_require__.r(ns);
//   Object.defineProperty(ns, 'default', { enumerable: true, value: value });
//   if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
//   return ns;
// };
//  8    4    2    1
// 0/1  0/1  0/1  0/1
// 8 直接返回不需要包装成es module
// 4 是es6模块 直接返回
// 2 拷贝所有的属性到ns上
// 1 模块ID需要加载
const modules = {
  "moduleA": function (module, exports) {
    module.exports = "moduleA"
  },
  "moduleB": function (module, exports) {
    module.exports = {
      __esModule: true,
      default: 'moduleB'
    }
  },
  "moduleC": function (module, exports) {
    module.exports = "moduleC"
  }
}
function t(value, mode) {
  if (mode & 1) {
    value = __webpack_require__(value)
  }
  if (mode & 4) {
    if (value.__esModule)
      return value
  }
  if (mode & 8) return value
  // 创建新的命名空间
  var ns = Object.create(null);
  ns.__esModule = true;
  ns.default = value;
  if (mode & 2) {
    for (const key in value) {
      ns[key] = value[key]
    }
  }
  return ns;
}

const moduleA = t('moduleA', 0b1001);
console.log(moduleA)
const moduleB = t('moduleB', 0b0101);
console.log(moduleB) // es6
const moduleC = t('moduleC', 0b0111);
console.log(moduleC) // 强行包装为es6


// 加载器
function __webpack_require__(moduleId) {
  var module = {
    i: moduleId,
    l: false,
    exports: {}
  };
  modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)
  module.l = true;
  return module.exports;
}