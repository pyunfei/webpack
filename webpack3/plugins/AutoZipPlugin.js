const JsZip = require('jszip');

class AutoZipPlugin {
  constructor(options) {
    this.options = options
  }
  apply(complier) {
    // 准备/将要 向硬盘写文件时出发 emit 串行
    complier.hooks.emit.tapAsync('AutoZipPlugin', (compilation, callback) => {
      console.log(compilation.assets);
      const zip = new JsZip();
      for (let filename in compilation.assets) {
        zip.file(filename, compilation.assets[filename].source());
      }
      // 不用调用fs写文件 直接使用webpack自带的assets , 保持最后产出的格式与之前的assets一致
      zip.generateAsync({ type: 'nodebuffer' }).then(content => {
        // 向assets挂载新的属性值
        compilation.assets[this.options.name] = {
          source() { return content },
          size() { return content.length }
        };
        callback(null, compilation);
      })
    })
  }
}

module.exports = AutoZipPlugin;