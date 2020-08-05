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
            title: 'Output Management'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    output: {
        filename: '[name].bundle.js',
        // chunkFilename: '[name].bundle.js', //动态导入
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
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