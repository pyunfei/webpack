const loader = source => {
  return source + '//loader3'
  // 异步loader
  // const callback = this.async();
  // setTimeout(() => {
  //   callback(null, source + '//loader3')
  // },1000)
}

module.exports = loader;