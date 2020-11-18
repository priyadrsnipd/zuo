const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');


module.exports = merge(common, {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: false,
  plugins: [
    new webpack.SourceMapDevToolPlugin({}),
    new HtmlWebpackPlugin({
      template: "./src/template.html"
    })],
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, "src/scss")
        ],
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ]
  }
}); 