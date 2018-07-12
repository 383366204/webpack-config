const path = require('path');
const glob = require('glob');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const PurifyCssPlugin = require('purifycss-webpack');
const common = require('./webpack.common.js');
const config = require('./config');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          safe: true
        }
      })
    ]
  },
  module: {
    rules: [{ // 对 css 后缀名进行处理
      test: /\.css$/,
      // 不处理 node_modules 文件中的 css 文件
      exclude: /node_modules/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'
        }
      }, {
        loader: 'css-loader',
        options:{
          modules:true,
          localIdentName: '[path][name]__[local]--[hash:base64:5]'
        }
      }, {
        loader: 'postcss-loader'
      }]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../')
    }),
    new MiniCssExtractPlugin({
      filename: config.cssOutputPath + '[name].[chunkhash].css',
      // chunkFilename: config.cssOutputPath + "common.css"
    }),
    // new PurifyCssPlugin({
    //   paths: glob.sync(path.join(__dirname, '../src/html/*.html')),
    // })
  ]
});