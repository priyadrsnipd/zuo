const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'main.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin({}),
      new TerserPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'template.html'),
        minify: {
          removeAttributeQuotes: true,
          removeComments: true,
          collapseWhitespace: true
        }
      }),
      new ImageMinimizerPlugin({
        minimizerOptions: {
          plugins: [
            ['gifsicle', { interlaced: true }],
            ['jpegtran', { progressive: true }],
            ['optipng', { optimizationLevel: 5 }],
            [
              'svgo',
              {
                plugins: [
                  {
                    removeViewBox: false,
                  },
                ],
              },
            ],
          ],
        }
      }),
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new HtmlCriticalWebpackPlugin({
      base: path.resolve(__dirname, 'dist'),
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      minify: true,
      extract: true,
      width: 375,
      height: 565,
      penthouse: {
        blockJSRequests: false,
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, 'src', 'scss')
        ],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
    ]
  }
});
