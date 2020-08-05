const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //module.exports = {}
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //export {}
const webpack = require('webpack');
const { SplitChunksPlugin } = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js',
    },
    devServer: {
        contentBase: './dist', //方便实时刷新的
        hot: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Caching'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    optimization: {
        moduleIds: 'hashed',
        splitChunks: {
            // chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        runtimeChunk: 'single' // Set it to single to create a single runtime bundle for all chunks
    },
    output: {
        filename: '[name].[hash].js',
        // chunkFilename: '[name].bundle.js', //动态导入
        path: path.resolve(__dirname, 'dist'),
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};