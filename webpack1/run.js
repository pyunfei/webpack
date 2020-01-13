const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
debugger;
const compiler = webpack(webpackConfig);
compiler.run((err, status) => {
  // console.log(status)
})