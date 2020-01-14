const webpack = require('./webpack');
const webpackOptions = require('./webpack.config');
webpack(webpackOptions, (err, status) => {
  if (err) {
    console.log('err:::', err);
  } else {
    status.toJson({
      // 结果转为json
      hash: true,
      assets: false
    })
  }
})
