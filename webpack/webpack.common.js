const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const commonConfig = {
  target: 'web',
  entry: {
    app: path.resolve(__dirname, '../src/index.ts'),
    style: path.resolve(__dirname, '../src/styles/style.css')
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../src/assets'),
          to: path.resolve(__dirname, '../dist/assets'),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
	  {
        test: /\.(ttf|eot|woff|woff2)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
};

module.exports = commonConfig;
