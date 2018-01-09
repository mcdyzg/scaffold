const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const os = require('os')
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
const AutoDllPlugin = require('autodll-webpack-plugin');

module.exports = {
    entry: {
        app: [
            './src/app/app.js'
        ],
        // app2: [
        //     './src/app/app2.js'
        // ],
        // vendor:['react','react-dom','react-router-dom'],
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
    // 会生成.map文件
    // devtool: 'source-map',
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     name:'vendor',                                  //将公共模块打包
        //     // filename:'vendor.js'
        // }),
        new HappyPack({id: 'jsx', threadPool: happyThreadPool, loaders: ['babel-loader']}),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            },
            __LOCAL__: false,
            __PRO__: true
        }),
        new HtmlWebpackPlugin({                         //生成模板文件
            template: './index.html',
            filename: 'index.html',
            chunks: ['app','vendor'],
            // manifest:'static/common-1.0.0.js',
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
        // new webpack.DllReferencePlugin({
        //     // context: __dirname,
        //     manifest: require('./dist/static/common.manifest.json'),
        //     // name:'dll'
        // }),
        new AutoDllPlugin({
            inject: true, // will inject the DLL bundle to index.html
            debug: true,
            filename: '[name]-1.0.0.js',
            path: './dist/static',
            plugins: [
                new webpack.optimize.UglifyJsPlugin(),
                // 如果不适用本插件，react将会打development环境的包
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: '"production"'
                    },
                }),
            ],
            entry: {
                vendor: [
                'react',
                'react-dom',
                'react-router-dom',
                ]
            }
        })
    ]
}
