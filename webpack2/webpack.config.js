const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'none',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, 'node_modules'),
    path.resolve(__dirname, 'loaders')]
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env']
      //     }
      //   }
      // },
      {
        test: /\.js$/,
        use: {
          loader: 'banner-loader',
          options: {
            text: 'This is My Loader',
            filename: './name.js' //无配置text读取filename中的内容 
          }
        }
      }
    ]
  }
}