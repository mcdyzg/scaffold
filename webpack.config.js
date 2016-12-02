const webpack = require('webpack');
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const dashboard = new Dashboard();

const config = {
    devtool: 'eval-source-map', //开发环境使用;线上环境请禁用
    entry: __dirname + '/src/app/app.js',
    output: {
        path: __dirname + '/dist',
        filename: 'app.js'
    },

    devServer: {
        contentBase: './',          //本地服务器所加载的页面所在的目录
        inline: true,               //设置为true，当源文件改变时会自动刷新页面
        port: 8081,                 //设置默认监听端口，如果省略，默认为8080
        historyApiFallback: true,   //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        colors: true,               //设置为true，使终端输出的文件为彩色的
        hot: true,                  //是否热部署
        quiet: true                 //让dev server处于静默的状态启动
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
                //loader: 'style!css?modules!postcss'
                loader: 'style!css!postcss'
            },
            {
                test: /\.scss$/,
                //loader: 'style!css?modules!sass!postcss'
                loader: 'style!css!sass!postcss'
            }
        ]
    },

    postcss: [
        require('autoprefixer')//调用autoprefixer插件
    ],
    plugins: [
        new DashboardPlugin(dashboard.setData),             //控制台日志
        new webpack.HotModuleReplacementPlugin(),           //热加载插件
        new webpack.NoErrorsPlugin()                        //允许错误不打断程序
    ]
};

module.exports = config;
