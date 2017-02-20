const { resolve } = require('path');
const webpack = require('webpack');

const config = {
    devtool: 'eval-source-map', //开发环境使用;线上环境请禁用
    entry: {
        app:[
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:8081',
            'webpack/hot/only-dev-server',
            __dirname + '/src/app/app.js'
            ]
        // app2: __dirname + '/src/app/app2.js',     // 多个入口文件打开本选项。
        // vendor:['react','react-dom','react-router']
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    context: resolve(__dirname, 'src'),
    devServer: {
        contentBase: './test',      //本地服务器所加载的页面所在的目录
        // inline: true,               //设置为true，当源文件改变时会自动刷新页面
        port: 8081,                 //设置默认监听端口，如果省略，默认为8080
        historyApiFallback: true,   //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        hot: true,                  //是否热部署
        quiet: false,               //让dev server处于静默的状态启动
        stats: {
            colors: true, // color is life
            chunks: false, // this reduces the amount of stuff I see in my terminal; configure to your needs
            'errors-only': true
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
    // 是否监听文件变化，默认false,如果开启web-dev-server,则默认true
    watch: true,
    // 运行环境
    target:'web',
    // postcss: [
    //     require('autoprefixer')//调用autoprefixer插件
    // ],
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),           //热加载插件
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
          __LOCAL__: true,                                  // 本地环境
          __PRO__:   false                                  // 生产环境
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name:'vendor',                                  //将公共模块打包
        //     filename:'vendor.js'
        // }),
    ]
};

module.exports = config;