const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry:{
        common:['react','react-dom','react-router-dom']
    },
    output: {
        path: path.resolve(__dirname, './dist/static'),
        filename: '[name]-1.0.0.js',
        library: '[name]',
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            },
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false,
                drop_console: false
            },
            beautify:false,
            comments:false
        }),
        new webpack.DllPlugin({
          path: path.resolve(__dirname, 'dist/static/[name].manifest.json'),
          name: '[name]',
          // context: __dirname,
        }),
    ]
}
