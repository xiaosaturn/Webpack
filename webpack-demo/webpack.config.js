const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //module.exports = {}
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //export {}

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js',
        print: './src/print.js'
    },
    devtool: 'inline-source-map', //方便调试的
    devServer: {
        contentBase: './dist' //方便实时刷新的
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Output Management'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
};