
class DonePlugin {
  constructor(options) {
    this.options = options
  }
  apply(complier) {
    // 编译完成之后
    complier.hooks.done.tap('DonePlugin', () => {
      // console.log(this.options)
    })
  }
}

module.exports = DonePlugin;