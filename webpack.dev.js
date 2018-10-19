const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const common = require('./webpack.common')
module.exports = merge(common, {
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'inline-source-map',
    devServer: {
        open: true,
        hot: true,
        contentBase: path.resolve(__dirname, 'src')
    }
}) 