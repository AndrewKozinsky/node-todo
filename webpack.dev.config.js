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
                    { loader: "babel-loader" },
                    { loader: 'source-map-loader' }
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
                test: /\.s[ac]ss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "app/index.html",
            buildTime: new Date().toISOString(),
            title: 'Hello, World!'
        })
    ],
    devtool: 'inline-source-map',
    devServer: {
        open: true
    }
};