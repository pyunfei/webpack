// 给每个生成的模板加一个版权声明注释
const loaderUtils = require('loader-utils');
const validateOptions = require('schema-utils');
const fs = require('fs');
const path = require('path');

function loader(source, map) {
  const callback = this.async();
  this.cacheable();// 开启缓存
  let options = loaderUtils.getOptions(this);
  const schema = {
    type: 'object',
    properties: {
      text: { type: 'string' },
      filename: { type: 'string' }, // text filename 任选一个
    }
  }
  // 校验对象合法性
  validateOptions(schema, options)
  const { filename, text } = options;
  console.log(filename)
  fs.readFile(path.join(__dirname, filename), 'utf8' , (err, data) => {
    console.log(err)
    callback(null, `/**${data} */` + source, map)
  })
  // return `/**${text} */` + source
}

module.exports = loader;