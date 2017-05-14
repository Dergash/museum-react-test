const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCss = new ExtractTextPlugin('index.css');

module.exports = {
    externals: {
        'jquery': 'jQuery'
    },
    context: path.resolve(__dirname),
    entry: {
        app: './src/app.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            /* Транспайлер jsx'a и modern JS'а */
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                }],
            },
            /* Транспайлер css (в основном хотел нестинг) */
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        "css-loader",
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [require('postcss-nested')],
                            }
                        }
                    ],
                }),
            },
        ],
    },
    /* Пути для резолва импортов */
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.resolve(__dirname, 'src'),
            "node_modules"
        ],
    },
    plugins: [
        /* Вынос повторяющегося кода и css */
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.js',
            minChunks: 2,
        }),
        /* Подзагрузка изменений для дев-сервера */
        new webpack.HotModuleReplacementPlugin(),
        /* html-ка для дев-сервера */
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        /* css в отдельный файл */
        new ExtractTextPlugin('styles.css'),
    ]
};