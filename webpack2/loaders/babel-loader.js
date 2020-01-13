const babel = require('@babel/core')
const path = require('path')
const loaderUtils = require('loader-utils');
function loader(source) {
  // 后去loader中的options中的参数 例如 @babel/preset-env
  let options =  loaderUtils.getOptions(this);
  options = {
    // presets: ['@babel/preset-env'],
    ...options,
    sourceMaps: true,// 生成自己的sourceMap
    filename: path.basename(this.resourcePath)
  }
  const { code, map, ast } = babel.transform(source, options);
  // console.log(code, map)
  return this.callback(null, code, map, ast);
}

module.exports = loader;