const webpack = require('webpack');
const path = require('path');
const HappyPack = require('happypack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const os = require('os');

const __ROOT = path.resolve(__dirname, '../'); // 根目录;
const __SRC = path.resolve(__ROOT, 'src');

const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
});

module.exports = {
    entry: {
        index: './src/pages/index'
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx'],
        alias: {
            '@api': path.resolve(__ROOT, 'src/api/'),
            '@components': path.resolve(__ROOT, 'src/components/'),
            '@constants': path.resolve(__ROOT, 'src/constants/'),
            '@pages': path.resolve(__ROOT, 'src/pages/'),
            '@utils': path.resolve(__ROOT, 'src/utils/')
        },
        modules: [__SRC, 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: __SRC
            },
            {
                test: /\.(ts|js)x?$/,
                use: 'happypack/loader?id=babel',
                include: __SRC,
                exclude: /node_modules/
            },
            {
                oneOf: [
                    {
                        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                        loader: 'url-loader',
                        options: {
                            limit: 10000, // 小于10k，图片格式为base64
                            name: 'static/image/[name].[hash:8].[ext]'
                        }
                    },
                    {
                        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'static/media/[name].[hash:8].[ext]'
                        }
                    },
                    {
                        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'static/font/[name].[hash:8].[ext]'
                        }
                    },
                    {
                        exclude: [/\.(ts|js)x?$/, /\.html$/, /\.json$/, /\.(css|scss|less)/],
                        loader: 'file-loader',
                        options: {
                            name: 'static/media/[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // 以进度条的形式反馈打包进度
        new ProgressBarPlugin(),
        // 清空文dist件夹
        new CleanWebpackPlugin({
            verbose: true, // 开启在控制台输出信息
            dry: false // 启用删除文件
        }),
        // 描述动态链接库的文件内容
        new webpack.DllReferencePlugin({
            context: __ROOT,
            manifest: require(path.resolve(__ROOT, 'dll/commonLib.manifest.json')) // 必须是绝对路径，相对路径会报错
        }),
        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin({
            template: path.resolve('public/index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeScriptTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        // 该插件将给定的 JS 或 CSS 文件添加到 webpack 配置的文件中，并将其放入资源列表 html webpack插件注入到生成的 html 中。
        new AddAssetHtmlPlugin([
            {
                // 要添加到编译中的文件的绝对路径，以及生成的HTML文件。支持 globby 字符串
                filepath: path.resolve(__ROOT, 'dll/*.dll.js'),
                // 文件输出目录
                outputPath: 'lib',
                // 脚本或链接标记的公共路径
                publicPath: '/lib'
            }
        ]),
        new HappyPack({
            id: 'babel',
            threadPool: happyThreadPool,
            loaders: ['cache-loader', 'babel-loader'],
            verbose: true // 允许 HappyPack 输出日志
        }),
        // 按需加载lodash
        new LodashModuleReplacementPlugin({
            paths: true
        })
    ]
};
