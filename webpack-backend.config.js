const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    context: path.resolve(__dirname),
    target: 'node',
    entry: './src/mocks/server.js',
    output: {
        path: path.resolve(__dirname, 'dist', 'mocks'),
        filename: 'server.js',
    },
    externals: nodeModules,
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
            {
                test: /\.css$/,
                loader: 'raw',
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
};