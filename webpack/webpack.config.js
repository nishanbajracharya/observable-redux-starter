const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.join(__dirname, '../src'),

  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    port: 9000,
    compress: true,
    host: 'localhost',
    historyApiFallback: true,
    contentBase: path.join(__dirname, '../dist'),
  },

  entry: ['babel-polyfill', './index.js'],

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }))
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: 'file-loader?name=[name].[ext]&outputPath=/images/',
      },
      {
        test: /\.ico$/,
        use: 'file-loader?name=[name].[ext]&outputPath=/',
      },
      {
        test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: 'file-loader?name=[name].[ext]&outputPath=/fonts/',
      },
    ],
  },

  output: {
    chunkFilename: '[id].js',
    filename: 'js/bundle.[hash].js',
    path: path.join(__dirname, '../dist'),
  },

  plugins: [
    new ExtractTextPlugin('css/bundle.[contenthash].css'),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  resolve: {
    modules: [path.join(__dirname, '../node_modules')],
  },
};
