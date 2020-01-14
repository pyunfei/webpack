const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DonePlugin = require('./plugins/DonePlugin');
const OptimizePlugin = require('./plugins/OptimizePlugin');
const EmitPlugin = require('./plugins/EmitPlugin');
const AutoZipPlugin = require('./plugins/AutoZipPlugin');
const PrefetchPlugin = require('./plugins/PrefetchPlugin');

module.exports = {
  mode: 'development',
  context: process.cwd(),
  devtool: 'none',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }]
            ]
          }
        },
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      path: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html'
    }),
    new CleanWebpackPlugin(),
    // new DonePlugin({
    //   message: '编译完成'
    // }),
    // new OptimizePlugin(),
    // new EmitPlugin(),
    // new AutoZipPlugin({
    //   name: 'test.zip'
    // }),
    new PrefetchPlugin()
  ]
}