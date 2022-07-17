const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/core.js',
  // entry: ['./src/core.js', './src/editor.js', './src/admn-panel.js'],
  output: {
    filename : 'core.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.txt$/, use:'raw-loader',
      },
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'}
          {loader: 'css-loader', options:{modules:true}},
          {loader: 'sass-loader'},
        ]
      },
      {
        test: /\.ts$/, use:'ts-loader',
      }
    ],
  },
  plugin: [new htmlWebpackPlugin({template:'./src/index.html'})],
};
