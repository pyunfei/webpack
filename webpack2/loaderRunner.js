const fs = require('fs')
const path = require('path')

function createLoaderObject(loaderPath) {
  let obj = { data: {} }; // 使用存储数据在normal/pitch中传递数据
  obj.request = loaderPath; // 使用来存储loader的绝对路径
  obj.normal = require(loaderPath); // loader
  obj.pitch = obj.normal.pitch; //  pitch
  return obj;
}
function definePropertyLoader(loaderContext) {
  // loader2为例
  Object.defineProperty(loaderContext, 'request', {
    get() {
      //绝对路径 + 资源路径 loader1!loader2!loader3!hello.js
      return loaderContext.loaders
        .map(loader => loader.request)
        .concat(loaderContext.resource).join('!');
    }
  })
  Object.defineProperty(loaderContext, 'remindingRequest', {
    get() {
      //绝对路径 + 资源路径 loader3!hello.js
      return loaderContext.loaders.slice(loaderContext.loaderIndex + 1)
        .map(loader => loader.request)
        .concat(loaderContext.resource).join('!');
    }
  })
  Object.defineProperty(loaderContext, 'currentRequest', {
    get() {
      //绝对路径 + 资源路径 loader2!loader3!hello.js
      return loaderContext.loaders.slice(loaderContext.loaderIndex)
        .map(loader => loader.request)
        .concat(loaderContext.resource).join('!');
    }
  })
  Object.defineProperty(loaderContext, 'previousRequest', {
    get() {
      //绝对路径 + 资源路径 loader1
      return loaderContext.loaders.slice(0, loaderContext.loaderIndex)
        .map(loader => loader.request)
        .join('!');
    }
  })
}

function runLoaders(options, finallyCallback) {
  let loaderContext = options.context || {};
  //将资源等存储到context
  loaderContext.resource = options.resource;
  loaderContext.readResource = options.readResource;
  loaderContext.loaders = options.loaders.map(createLoaderObject)
  loaderContext.loaderIndex = 0; // 当前执行loader索引

  // 属性
  definePropertyLoader(loaderContext);
  // console.log(loaderContext.currentRequest)

  // pitch
  iteratePitchingLoaders(loaderContext, finallyCallback)
  function iteratePitchingLoaders(loaderContext, finallyCallback) {
    let currentLoaderObject = loaderContext.loaders[loaderContext.loaderIndex];
    let pitchFn = currentLoaderObject.pitch;
    if (!pitchFn) { // 递归pitch
      loaderContext.loaderIndex++;
      return iteratePitchingLoaders(loaderContext, finallyCallback)
    }
    const args = pitchFn.apply(loaderContext,
      [loaderContext.remindingRequest,
      loaderContext.previousRequest,
      loaderContext.data]
    );

  }
}

runLoaders({
  resource: path.resolve(__dirname, 'src', 'hello.js'),
  loaders: [
    path.resolve('loaders', 'loader1'),
    path.resolve('loaders', 'loader2'),
    path.resolve('loaders', 'loader3'),
  ],
  context: {},
  readResource: fs.readFile.bind(fs)
}, function (err, result) {
  console.log(result)
})