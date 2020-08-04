const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //module.exports = {}
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //export {}

module.exports = {
    entry: {
        app: './src/index.js',
        print: './src/print.js'
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
    },
};