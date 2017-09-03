const path = require('path');
const webpack = require('webpack');
const dotenv = require('webpack-dotenv-plugin');
const BUILD_DIR = path.resolve(__dirname, 'build');
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = {
    entry: [
        SRC_DIR + '/base.less',
        SRC_DIR + '/index.jsx'
    ],
    output: {
        path: BUILD_DIR,
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }, {
                test: /\.less$/,
                loader: "style-loader!css-loader!autoprefixer-loader!less-loader"
            }, {
                test: /\.png$/,
                loader: "url-loader?limit=100000"
            }, {
                test: /\.jpg$/,
                loader: "file-loader"
            }, {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
    eslint: {
        failOnWarning: true,
        failOnError: true
    },
    plugins: [
        new dotenv({sample: './.env.tpl', path: './.env'})
    ]
};