const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server')
const fs = require('fs');
const respawn = require('respawn');
const webpackFrontConfig = require('./webpack.config.js');
const webpackBackConfig = require('./webpack-backend.config.js');

runFront();
runBack();

function runFront() {
    const host = 'localhost';
    const port = '8080';
    const address = `http://${host}:${port}/`;
    const serverConfig = {
        hot: true,
        stats: { colors: true },
        historyApiFallback: true,
    };
    new webpackDevServer(webpack(webpackFrontConfig(['./src/app.js'])), serverConfig)
        .listen(port, host, (err, result) => {
        if (!!err) {
            console.log(err);
        } else {
            console.log(`Listening at ${address}`);
        }
    });
}

function runBack() {
    const backendCompiler = webpack(webpackBackConfig);
    backendCompiler.plugin('compile', () => {
        console.log('Building server...');
    });
    let monitor;
    backendCompiler.plugin('done', (res) => {
        try {
            console.log('Restarting server...');
            if (!monitor) {
                monitor = respawn(['node', '--harmony', './dist/mocks/server.js', '--color'], {
                    cwd: '.',
                    maxRestarts: -1,
                    sleep: 100,
                    kill: 4000,
                    stdio: [
                        process.stdin,
                        process.stdout,
                        process.stderr
                    ],
                });
                monitor.start();
            } else {
                monitor.stop(() => {
                    monitor.start()
                });
            }
        } catch (e) {
            console.error(e.toString());
        }
    });
    backendCompiler.watch(100, (error) => {
        if (error) {
            console.error(error.stack || error);
            if (error.details) {
                console.error(error.details);
            }
        }
    });
}