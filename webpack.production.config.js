const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//控制台日志
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const dashboard = new Dashboard();

const glob = require('glob');
const path = require('path');

function getEntries (globPath) {
    var files = glob.sync(globPath);
    var entries = {}, entry, dirname, basename;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        basename = path.basename(entry, '.js');
        entries[basename] = entry;
    }

    return entries;
}

const entries = getEntries(__dirname + '/src/app/*.js');

const config = {

    entry: {},

    output: {
        path: __dirname + '/dist',
        filename: '[name]/[name].min.js'
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
        // //new ExtractTextPlugin("app.min.css"),           //是否分离CSS和JS文件("[name]-[hash].css")
        // new HtmlWebpackPlugin({                         //生成模板文件
        //     template: __dirname + "/index.tpl.html"
        // }),
        new DashboardPlugin(dashboard.setData)             //控制台日志

    ]
};

Object.keys(entries).forEach(function(name) {
    // 每个页面生成一个entry，如果需要HotUpdate，在这里修改entry
    config.entry[name] = entries[name];

    // 每个页面生成一个html
    var plugin = new HtmlWebpackPlugin({
        // 生成出来的html文件名
        filename: name + '/' + name + '.html',
        // 每个html的模版，这里多个页面使用同一个模版
        template: __dirname + "/index.html",
        // 自动将引用插入html
        inject: true,
        // 每个html引用的js模块，也可以在这里加上vendor等公用模块
        chunks: [name]
    });

    config.plugins.push(plugin);
});

module.exports = config;