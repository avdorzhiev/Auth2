const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const eslintOptions = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'plugin:@typescript-eslint/recommended' // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    ],
    parserOptions: {
        project: path.resolve(__dirname, './tsconfig.json'),
        tsconfigRootDir: __dirname,
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
    rules: {
        'indent': 'off',
        'quotes': 'off',
        'no-trailing-spaces': 'off',
        'no-mixed-spaces-and-tabs': 'off',
        'semi': 'off',
        '@typescript-eslint/no-unused-vars': 'off'
    }
};


// eslint-disable-next-line no-undef
module.exports = {

    entry: {
        angular: './src/angular.js',
        app: './src/app/index.ts',
    },
    output: {
        // eslint-disable-next-line no-undef
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
        new ForkTsCheckerWebpackPlugin({
            checkSyntacticErrors: true,
            workers: 1,
            useTypescriptIncrementalApi: true,
            memoryLimit: 4096,
            eslint: false,
            eslintOptions
        }),
    ]
};