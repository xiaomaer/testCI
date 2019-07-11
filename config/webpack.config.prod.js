const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将样式文件抽离成一个文件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 开启多核压缩js
const OptmizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); // css压缩
const os = require('os');

const baseWebpackConfig = require('./webpack.config.base');

let prodConfig = merge(baseWebpackConfig, {
    mode: 'production',
    devtool: 'hidden-source-map',
    output: {
        path: path.resolve(__dirname, '../testCI'),
        filename: '[name].[chunkhash:8].js',
        chunkFilename: '[id].[chunkhash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                include: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1 // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2 // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.less$/,
                // exclude: /node_modules/, // antd动态引入，需要支持less解析
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2 // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                        }
                    },
                    'postcss-loader',
                    { loader: 'less-loader', options: { javascriptEnabled: true } }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            minSize: 100000,
            minChunks: 2
        },
        minimizer: [
            new UglifyJsPlugin({
                parallel: os.cpus().length,
                cache: true,
                // sourceMap: true, //使用 SourceMaps 将错误信息的位置映射到模块。这会减慢编译的速度。因此去掉
                uglifyOptions: {
                    compress: {
                        // 删除所有的 `console` 语句，可以兼容ie浏览器
                        drop_console: true,
                        // 内嵌定义了但是只用到一次的变量
                        collapse_vars: true,
                        // 提取出出现多次但是没有定义成变量去引用的静态值
                        reduce_vars: true
                    },
                    output: {
                        // 最紧凑的输出
                        beautify: false,
                        // 删除所有的注释
                        comments: false
                    }
                }
            }),
            new OptmizeCssAssetsWebpackPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    safe: true,
                    discardComments: {
                        removeAll: true
                    }
                }
            })
        ]
    },
    plugins: [
        // Makes some environment variables available to the JS code, for example:
        // It is absolutely essential that NODE_ENV was set to production here.
        // Otherwise React will be compiled in the very slow development mode.
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css'
        }),
        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
});
if (process.env.NODE_ANALYZE) {
    // 打包模块分析
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
    // https://github.com/stephencookdev/speed-measure-webpack-plugin
    const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
    // 每阶段打包时间统计
    const smp = new SpeedMeasurePlugin();
    prodConfig.plugins.push(new BundleAnalyzerPlugin());
    prodConfig = smp.wrap(prodConfig);
}
module.exports = prodConfig;
