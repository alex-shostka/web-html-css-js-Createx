const { merge } = require('webpack-merge');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const commonConfig = require('./webpack.common');

const prodConfig = {
  mode: 'production',
  devtool: 'hidden-source-map',
  output: {
    filename: '[id].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    assetModuleFilename: 'assets/[name][ext]',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[hash].bundle.css',
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
  optimization: {
    minimize: true,
    minimizer: [
      new HtmlMinimizerPlugin({
		minimizerOptions: {
			collapseWhitespace: true,
		},
	  }),
	  new TerserPlugin(),
	  new CssMinimizerPlugin(),
    ],
  },
};

module.exports = merge(commonConfig, prodConfig);
