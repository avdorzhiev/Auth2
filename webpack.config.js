const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

    entry: {
        angular: './src/angular.js',
        app: './src/app/app.ts',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/',
        chunkFilename: '[name].bundle.js'
    },
    devServer: {
        contentBase: './src/public',
        historyApiFallback: true,
        port: 4200,
        open: true
    },
    resolve: {
        extensions: ['.ts', '.js']
      },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'css-loader'

            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'file-loader'
            },
            {
                test: /\.html$/,
                loader:  'raw-loader'
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/public/index.html',
            inject: 'body'
        }),
        new CopyWebpackPlugin([{
            from: __dirname + '/src/public'
        }]),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
      ]
}