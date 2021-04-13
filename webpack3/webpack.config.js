const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DonePlugin = require('./plugins/DonePlugin');
const OptimizePlugin = require('./plugins/OptimizePlugin');
const EmitPlugin = require('./plugins/EmitPlugin');
const AutoZipPlugin = require('./plugins/AutoZipPlugin');
const PrefetchPlugin = require('./plugins/PrefetchPlugin');
const OssPlugin = require('./plugins/OssPlugin');

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
        test: /\.js$ | \.ts$ | \.tsx$/,
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

      // webpack.config.js OSS 专用
      // {
      //   test: /\.(jpg|png|gif|bmp|jepg)$/,
      //   use: {
      //     loader: 'url-loader',
      //     options: {
      //       limit: 0,
      //       name: 'common/[name].[hash:6].[ext]', //图片重新命名避免冲突
      //       publicPath: !isProduction ? '/' : 'oss的地址', // 如果是生产环境则替换成oss的地址
      //     }
      //   }
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      path: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html'
    }),
    // new CleanWebpackPlugin(),
    // new DonePlugin({
    //   message: '编译完成'
    // }),
    // new OptimizePlugin(),
    // new EmitPlugin(),
    // new AutoZipPlugin({
    //   name: 'test.zip'
    // }),
    new PrefetchPlugin(),
    new OssPlugin()
  ]
}