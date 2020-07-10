const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (env = {}) => {
    
    const mode = env.mode || 'development';
    
    const getOutput = () => {
        const output = {
            path: path.resolve(__dirname, 'app/dist')
        }
        
        if(mode === 'production') {
            filename = "main-[hash:8].js"
            output.path = path.resolve(__dirname, 'app/dist')
        }
        
        return output
    }
    
    const manageJS = () => {
        let jsConfig = {
            test: /\.js$/,
            exclude: '/node_modules/',
        }
        
        if(mode === 'development') {
            jsConfig = Object.assign(jsConfig, {
                enforce: 'pre',
                use: [
                    'babel-loader',
                    'source-map-loader'
                ]
            })
        }
    
        if(mode === 'production') {
            jsConfig = Object.assign(jsConfig, {
                use: ["babel-loader"]
            })
        }
    
        return jsConfig
    }
    
    
    const manageCSS = () => {
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
    
    
    const managePlugins = () => {
        let pluginsConfig = [
            new HtmlWebpackPlugin({
                template: "app/index.html"
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
    
    return {
        mode,
        entry: {
            index: path.resolve(__dirname, 'app/src')
        },
        output: getOutput(),
        module: {
            rules: [
                // Loading JavaScript
                manageJS(),
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
                manageCSS(),
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
        plugins: managePlugins(),
        devtool: 'inline-source-map',
        devServer: {
            port: 8080,
            historyApiFallback: true
        }
    }
};