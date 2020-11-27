const path = require('path');
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
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                }
            },
            {
                test: /\.css$/,
                use: [
                    'css-loader',
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                use: {
                    loader: 'file-loader'
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new HtmlWebpackPlugin({
            template: './src/public/index.html',
            inject: 'body',
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: __dirname + '/src/public',
                to: __dirname + '/dist'
            }]
        }),
      ]
}