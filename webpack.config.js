const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
  entry: {
    app: './src/index.js'
    // print: './src/print.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, '/dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
      hash: true
    }),
    new CleanWebpackPlugin(['dist'])
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  }
}
