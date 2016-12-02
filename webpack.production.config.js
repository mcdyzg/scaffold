const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: __dirname + '/src/app/app.js',
    output: {
        path: __dirname + '/dist',
        filename: 'app.min.js'
    },

    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                //loader: 'style!css?modules!postcss' //如果模块化使用
                loader: 'style!css!postcss'         //js和css打包成一个js文件(需注释插件ExtractTextPlugin)
                //loader: ExtractTextPlugin.extract('style', 'css!postcss') //js和css分开打包
                //loader: ExtractTextPlugin.extract('style', 'css?modules!postcss') //js和css分开打包(模块化)
            },
            {
                test: /\.scss$/,
                //loader: 'style!css?modules!sass!postcss' //如果模块化使用
                loader: 'style!css!sass!postcss'    //js和scss打包成一个js文件
                //loader: ExtractTextPlugin.extract('style', 'css!sass!postcss') //js和css分开打包
                //loader: ExtractTextPlugin.extract('style', 'css?modules!sass!postcss') //js和css分开打包(模块化)
            }
        ]
    },

    postcss: [
        require('autoprefixer') //调用autoprefixer插件
    ],
    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new CleanWebpackPlugin(['dist'], {
            "root": __dirname,
            verbose: true,
            dry: false
        }),
        new webpack.BannerPlugin("Copyright Mizlc inc."),   //打包文件抬头
        //new webpack.optimize.OccurenceOrderPlugin(),        //为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        new webpack.optimize.UglifyJsPlugin({               //压缩JS代码
            compress: {
                warnings: false                             //不显示warning
            }
        }),
        //new ExtractTextPlugin("app.min.css"),           //是否分离CSS和JS文件("[name]-[hash].css")
        new HtmlWebpackPlugin({                         //生成模板文件
            template: __dirname + "/index.tpl.html"
        })
    ]
};

module.exports = config;
