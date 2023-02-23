const { merge } = require('webpack-merge');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    assetModuleFilename: 'assets/[name][ext]',
  },
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    port: 4200,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // ???
    new MiniCssExtractPlugin({
      filename: 'styles/[name].bundle.css',
    }),
    new HTMLWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};

module.exports = merge(commonConfig, devConfig);
