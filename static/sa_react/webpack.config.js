    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
       entry: './app.js',
       output: {
          path: path.join(__dirname, '/bundle'),
          filename: 'index_bundle.js'
       },
       mode: 'development',
       devServer: {
          inline: true,
          port: 8000
       },
       module: {
          rules: [
             {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
             }
          ]
       },
       plugins:[
          new HtmlWebpackPlugin({
             template: './index.html'
          })
       ]
    }