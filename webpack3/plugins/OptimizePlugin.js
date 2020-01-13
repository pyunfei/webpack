
class OptimizePlugin {
  constructor(options) {
    this.options = options
  }
  apply(complier) {
    complier.hooks.compilation.tap('OptimizePlugin', compilation => {
      compilation.hooks.optimize.tap('optimize', () => {
        console.log('webpack优化步骤')
      })
    })
  }
}

module.exports = OptimizePlugin;