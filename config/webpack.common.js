const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config')

let HTMLPlugins = [];
let Entries = {}

config.HTMLDirs.forEach((page, index) => {
  const htmlPlugin = new HtmlWebpackPlugin({
    //生成的文件名
    filename: `${page}.html`,
    //根据自己的指定的模板文件来生成特定的 html 文件
    template: path.resolve(__dirname, `../src/html/${page}.html`),
    //生成html的title
    title: 'hello' + page,
    //生成的favicon.ico
    //给生成的 js 文件一个独特的 hash 值,是文件名后带？的那个hash,output中的[chunkhash]是文件名中带hash
    hash: true,
    //chunks 选项的作用主要是针对多入口(entry)文件。当你有多个入口文件的时候，对应就会生成多个编译后的 js 文件。那么 chunks 选项就可以决定是否都使用这些生成的 js 文件。
    //chunks 默认会在生成的 html 文件中引用所有的 js 文件，当然你也可以指定引入哪些特定的文件。
    chunks: [page, 'vendors','styles'],
    minify:{
      removeAttributeQuotes:true//压缩 去掉引号
    }
  });
  HTMLPlugins.push(htmlPlugin);
  Entries[page] = path.resolve(__dirname, `../src/js/${page}.js`);
})

module.exports = {
  entry:Entries,
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        // 凡是引用node_modules里的将会打包成为vendors
        vendors: {
          name:'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        // styles: {
        //   name: 'styles',
        //   test: /\.css$/,
        //   chunks: 'all',
        //   minChunks: 1,
        //   reuseExistingChunk: true,
        //   enforce: true
        // }
      }
    }
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_modules/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: config.imgOutputPath
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        use: {
        loader:"file-loader",
        options: {
          outputPath: config.imgOutputPath
        }}
      }
    ]
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [
    ...HTMLPlugins
  ]
};