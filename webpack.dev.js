const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = merge(common, {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
    ],
    output: {
        filename: 'bundle.js',
    },
    devTool: 'source-map',
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.jsx?/,
                include: SRC_DIR,
                loader: "react-hot-loader!babel-loader"
            }
        ]
    },
    devServer: {
        contentBase: './build',
        hot: true,
        historyApiFallback: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    debug: true
});