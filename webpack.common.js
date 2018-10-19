const path = require('path')
// 将bundle自动加入到html中
const CleanWebpackPlugin = require('clean-webpack-plugin')
// 清除文件夹中内容
const HtmlWebpackPlugin = require('html-webpack-plugin')

const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // 最简配置
                // loader: 'style-loader!css-loader?modules'
                // 对像配置
                use:[
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Chinese Chess',
            // 没有[chunkhash]好
            // hash: true,
            template:'src/index.html'
        }),
        new ManifestPlugin()
    ],
    output: {
        filename: process.env.NODE_ENV === 'production' ? '[name].bundle.[chunkhash].js' : '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
            // chunks: 'all'
        }
    }
}