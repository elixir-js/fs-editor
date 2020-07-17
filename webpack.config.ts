/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const appPath = path.resolve(__dirname, './src');
const monacoPath = path.resolve(__dirname, './node_modules/monaco-editor');
const nodeModulesPath = path.resolve('./node_modules');

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: '[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx'],
        alias: {
            client: appPath,
            models: path.resolve(appPath, './models'),
        },
        modules: [appPath, nodeModulesPath],
    },
    devServer: {
        port: 9000,
        open: true,
        watchContentBase: true,
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.tsx?/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve('./tsconfig.json'),
                        },
                    },
                ],
            },
            {
                test: /\.jpg$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash:7].[ext]',
                            outputPath: 'assets',
                        },
                    },
                ],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                include: appPath,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            namedExport: true,
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                include: monacoPath,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            minify: false,
        }),
        new MiniCssExtractPlugin({
            filename: '[hash].css',
        }),
        new MonacoWebpackPlugin({
            // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
            languages: ['json'],
        }),
    ],
};
