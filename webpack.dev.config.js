const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: path.resolve(__dirname, 'app/src')
    },
    output: {
        path: path.resolve(__dirname, 'app/dist')
    },
    module: {
        rules: [
            // Loading JavaScript
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                enforce: 'pre',
                use: [
                    'babel-loader',
                    'source-map-loader'
                ]
            },
            // Loading images
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: 'images',
                            name: '[name]-[sha1:hash:7].[ext]'
                        }
                    }
                ]
            },
            // Loading CSS
            {
                test: /\.s?[ac]ss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            // Loading fonts
            {
                test: /\.woff2$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: 'fonts',
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "app/index.html"
        })
    ],
    devtool: 'inline-source-map',
    devServer: {
        open: true
    }
};