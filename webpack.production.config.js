const { resolve } = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';
const isDev = !isProd;

const config = {
    // devtool: 'source-map', //开发环境使用;线上环境请禁用
    entry: {
        app: __dirname + '/src/app/app.js',
        // app2: __dirname + '/src/app/app2.js',     // 多个入口文件打开本选项。
        vendor:['react','react-dom']
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: '[name].min.js'
    },
    // context: resolve(__dirname, 'src'),

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
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|jpg)$/,
                use: [
                    {
                        loader:'url-loader',
                        options:{
                            limit:8192
                        }
                    }
                ]
            }
        ]
    },
    // 运行环境
    target:'web',
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            "root": __dirname,
            verbose: true,
            dry: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),//使react引用production版本而不是development版本
            },
            __LOCAL__: isDev,                                  // 本地环境
            __PRO__:   isProd                                  // 生产环境
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            },
            output: {
              comments: false
            },
            sourceMap: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor',                                  //将公共模块打包
            filename:'vendor.js'
        }),
        new HtmlWebpackPlugin({                         //生成模板文件
            template: __dirname + "/index.tpl.html",
            filename: 'index.html',
            chunks: ['app', 'vendor'],
        }),
    ]
};

module.exports = config;