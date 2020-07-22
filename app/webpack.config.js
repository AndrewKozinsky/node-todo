const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (env = {}) => {
    const mode = env.mode || 'development'
    
    return {
        mode,
        entry: {
            index: path.resolve(__dirname, 'src/index.js')
        },
        output: getOutput(mode),
        module: {
            rules: [
                // Loading JavaScript
                manageJS(mode),
                // Loading images
                {
                    test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
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
                manageCSS(mode),
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
        plugins: managePlugins(mode),
        // devtool: 'eval-cheap-module-source-map',
        devServer: {
            port: 8080,
            publicPath: '/',
            historyApiFallback: true
        }
    }
}

function getOutput(mode) {
    const output = {
        path: path.resolve(__dirname, 'dist')
    }
    
    if(mode === 'production') {
        filename = "main-[hash:8].js"
        output.path = path.resolve(__dirname, 'dist')
    }
    
    return output
}

function manageJS(mode) {
    let jsConfig = {
        test: /\.js$/,
        exclude: '/node_modules/',
    }
    
    if(mode === 'development') {
        jsConfig = Object.assign(
            jsConfig,
            {
                enforce: 'pre',
                use: [
                    { loader: 'babel-loader' },
                    { loader: 'source-map-loader' }
                ]
            }
        )
    }
    
    if(mode === 'production') {
        jsConfig = Object.assign(jsConfig, {
            use: ["babel-loader"]
        })
    }
    
    return jsConfig
}


function manageCSS(mode) {
    let cssConfig = {
        test: /\.s?[ac]ss$/
    }
    
    if(mode === 'development') {
        cssConfig = Object.assign(cssConfig, {
            enforce: 'pre',
            use: [
                "style-loader",
                {
                    loader: "css-loader",
                    options: {
                        modules: {
                            mode: 'local',
                            localIdentName: '[local]--[hash:base64:7]',
                        },
                    }
                },
                "sass-loader"
            ]
        })
    }
    
    if(mode === 'production') {
        cssConfig = Object.assign(cssConfig, {
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                        modules: true,
                    }
                },
                "sass-loader"
            ]
        })
    }
    
    return cssConfig
}

function managePlugins(mode) {
    let pluginsConfig = [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "index.html")
        })
    ]
    
    if(mode === 'production') {
        pluginsConfig.push(
            new MiniCssExtractPlugin({
                filename: 'index-[hash:8].css'
            })
        )
    }
    
    return pluginsConfig
}