const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';
const isDev = !isProd;

const config = {
    devtool: isDev ? 'eval-source-map':'source-map', //开发环境使用;线上环境请禁用
    entry: {
        app:[
            'react-hot-loader/patch',
            // activate HMR for React

            'webpack-dev-server/client?http://localhost:8081',
            // bundle the client for webpack-dev-server
            // and connect to the provided endpoint

            'webpack/hot/only-dev-server',
            // bundle the client for hot reloading
            // only- means to only hot reload for successful updates

            __dirname + '/src/app/app.js',
            // the entry point of our app
        ],
        // app2:[                               // 多个入口文件打开本选项。
        //     'react-hot-loader/patch',
        //     // activate HMR for React

        //     'webpack-dev-server/client?http://localhost:8081',
        //     // bundle the client for webpack-dev-server
        //     // and connect to the provided endpoint

        //     'webpack/hot/only-dev-server',
        //     // bundle the client for hot reloading
        //     // only- means to only hot reload for successful updates

        //     __dirname + '/src/app/app2.js',
        //     // the entry point of our app
        // ],
        vendor:['react','react-dom']
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash:8].sync.js',
        chunkFilename: '[name]-[id].[chunkhash:8].bundle.js',
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
    // watch: true,
    // 运行环境
    target:'web',
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),           //热加载插件
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
          __LOCAL__: isDev,                                  // 本地环境
          __PRO__:   isProd                                  // 生产环境
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