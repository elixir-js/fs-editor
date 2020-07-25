/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const appPath = path.resolve(__dirname, './src');
const monacoPath = path.resolve(__dirname, '../../node_modules/monaco-editor');
console.log(monacoPath);
const nodeModulesPath = path.resolve('./node_modules');

module.exports = {
    entry: {
        app: './src/client/src/index.tsx',
        'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker',
        'json.worker': 'monaco-editor/esm/vs/language/json/json.worker',
        'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker',
    },
    output: {
        filename: '[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx'],
        alias: {
            '@app': appPath,
            '@service': path.resolve(appPath, './services'),
            '@components': path.resolve(appPath, './components'),
        },
        modules: [appPath, nodeModulesPath],
    },
    devServer: {
        port: 9000,
        open: true,
        // watchContentBase: true,
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
                            configFile: 'tsconfig.json',
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
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css$/,
                include: monacoPath,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.ttf$/,
                use: ['file-loader'],
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
            languages: ['typescript', 'javascript', 'html'],
            features: [
                'accessibilityHelp',
                'bracketMatching',
                'caretOperations',
                'clipboard',
                'codeAction',
                'codelens',
                'colorDetector',
                'comment',
                'contextmenu',
                'coreCommands',
                'cursorUndo',
                'dnd',
                'find',
                'folding',
                'fontZoom',
                'format',
                'gotoError',
                'gotoLine',
                'gotoSymbol',
                'hover',
                'iPadShowKeyboard',
                'inPlaceReplace',
                'inspectTokens',
                'linesOperations',
                'links',
                'multicursor',
                'parameterHints',
                'quickCommand',
                'quickOutline',
                'referenceSearch',
                'rename',
                'smartSelect',
                'snippets',
                'suggest',
                'toggleHighContrast',
                'toggleTabFocusMode',
                'transpose',
                'wordHighlighter',
                'wordOperations',
                'wordPartOperations',
            ],
        }),
    ],
};
