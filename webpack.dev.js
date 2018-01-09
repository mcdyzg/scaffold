const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const os = require('os')
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

module.exports = {
    entry: {
        app: [
            './src/app/app.js'
        ],
        vendor:['react','react-dom','react-router-dom'],
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        chunkFilename: '[name].[hash].js',
        publicPath:''
    },
    resolve: {
        extensions: [
            ".js", ".jsx"
        ],
        alias: {
            '@comp': path.resolve(__dirname, './src/components'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@modules': path.resolve(__dirname, './src/modules'),
            '@DB': path.resolve(__dirname, './src/db'),
        }
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use:[
                    {
                        loader:'babel-loader'
                    }
                ],
                exclude: /node_modules/
            }, {
                test: /\.(css|scss)/,
                use:[
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }, {
                test: /\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                {
                    loader:'url-loader',
                    options: {
                        limit: 8192,
                        name: 'img/[name].[hash:7].[ext]'
                    }
                }
                ],

            },
        ]
    },
    // webpack 可以监听文件变化，当它们修改后会重新编译。这个页面介绍了如何启用这个功能，以及当 watch 无法正常运行的时候你可以做的一些调整。
    watch: true,
    watchOptions:{
        ignored: /node_modules/,
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor',                                  //将公共模块打包
            // filename:'vendor.js'
        }),
        new HappyPack({id: 'jsx', threadPool: happyThreadPool, loaders: ['babel-loader']}),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            },
            __LOCAL__: true,
            __PRO__: false
        }),
        new HtmlWebpackPlugin({                         //生成模板文件
            template: './index.html',
            filename: 'index.html',
            chunks: ['app','vendor'],
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false,
                drop_console: true
            },
            beautify:false,
            comments:false
        }),
    ]
}
