const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const config = require('./config')
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [{ // 对 css 后缀名进行处理
      test: /\.css$/,
      // 不处理 node_modules 文件中的 css 文件
      exclude: /node_modules/,
      // 抽取 css 文件到单独的文件夹
      use: ["style-loader","css-loader","postcss-loader"]
    }]
  },
  devServer: {
    contentBase: config.devServerOutputPath,
    overlay: {
      error: true,
      warnings: true
    }
  }
});