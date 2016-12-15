const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const config = {

    entry: {
        app: __dirname + '/src/app/app.js',
        // app2: __dirname + '/src/app/app2.js',     // 多个入口文件打开本选项。
        vendor:['react','react-dom','react-router']  // 将公共模块打成一个common包，需要在打开CommonsChunkPlugin插件
    },

    output: {
        path: __dirname + '/dist',
        filename: '[name].min.js',
        // publicPath:'www.mizlicai.com'         // 启用publicPath,打包出的js、css和img都会添加此前缀，方便打包后将资源传到cdn时，免去修改html资源路径的麻烦。
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
            },
            __LOCAL__: false,                               // 本地环境
            __PRO__:   true,                                //生产环境
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
        //new ExtractTextPlugin("app.min.css"),           //是否分离CSS和JS文件("[name]-[hash].css"),如果分离，打出单独的app.min.css包，并且会在模板html的头部插入linkl标签,并且打包出的css会添加publicPath的头前缀。
        new HtmlWebpackPlugin({                         //生成模板文件
            template: __dirname + "/index.tpl.html",
            filename: 'index.html',
            chunks: ['app', 'vendor'],
        }),
        // new HtmlWebpackPlugin({                      //如果要多个入口js打成多个包，并且需要生成多个html文件，复制本段即可。
        //     template: __dirname + "/index.tpl.html",
        //     filename: 'index2.html',
        //     chunks: ['app2', 'vendor'],
        // }),
        new webpack.optimize.CommonsChunkPlugin(             //将公共模块打包
            /* chunkName= */'vendor', 
            /* filename= */'vendor.js'
        ),

    ]
};

module.exports = config;