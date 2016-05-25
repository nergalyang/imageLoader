var path = require('path');

module.exports = {
    entry: "./index.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {
              test: /.jsx?$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query: {
                 presets:[ 'es2015', 'react', 'stage-2' ]
              }
            }
        ]
    },
};