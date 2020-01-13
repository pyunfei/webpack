
class EmitPlugin {
  constructor(options) {
    this.options = options
  }
  apply(complier) {
    complier.hooks.emit.tapAsync('EmitPlugin', (compilation, callback) => {
      setTimeout(() => {
        callback()
      }, 3000)
    })
  }
}

module.exports = EmitPlugin;