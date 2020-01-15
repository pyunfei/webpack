function n(module) {
  // es6模块回过r 赋值esModule属性为true
  const getter = module.__esModule ? function () {
    return module.default;
  } : function () {
    return module;
  }
  return getter;
}

const mode = {
  // __esModule: true,
  default: { name: 'test' }
}
const getter = n(mode);
console.log(getter())