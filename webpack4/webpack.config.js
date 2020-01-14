const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: false,
  entry: {
    index: './src/index.js',
    hello: './src/hello.js'
  },
  // entry: './src/index.js',
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vendors: {
  //         chunks: 'initial',// 分割类型 all/async/initial 全部/异步/同步
  //         name: 'vendors', //分割代码名
  //         test: /node_modules/,
  //         priority: -10,// 优先级
  //       },
  //       commons: {
  //         chunks: 'initial',
  //         name: 'commons',
  //         minSize: 0, // 提取模块最小字节
  //         minChunks: 1, //  最小共用依赖的chunks
  //         priority: -20,
  //       }
  //     }
  //   }
  // },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  }
}