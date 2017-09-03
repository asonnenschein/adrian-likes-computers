const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = merge(common, {
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: SRC_DIR,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    output: {
        filename: '[name].bundle.js',
    }
});