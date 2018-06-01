const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const config = require('./config');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [{ // 对 css 后缀名进行处理
        test: /\.css$/,
        // 不处理 node_modules 文件中的 css 文件
        exclude: /node_modules/,
        // 抽取 css 文件到单独的文件夹
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          publicPath: config.cssPublicPath,
          use: [{
              loader: "css-loader",
              options: {
                minimize: true,
              }
            },
            {
              loader: "postcss-loader",
            }
          ]
        })
      },
      // { // 对 css 后缀名进行处理
      //   test: /\.css$/,
      //   // 不处理 node_modules 文件中的 css 文件
      //   exclude: /node_modules/,
      //   // 抽取 css 文件到单独的文件夹
      //   use: ["style-loader","css-loader","postcss-loader"]
      // }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../')
    }),
    new ExtractTextPlugin({
      filename: config.cssOutputPath+'[name].[chunkhash].css',
      allChunks: true
    }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});