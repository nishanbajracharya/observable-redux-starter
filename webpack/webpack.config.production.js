const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Check if .env file exists
if (!fs.existsSync('.env.prod')) {
  throw new Error('.env.prod file does not exist.');
}

// Initialize environment variables
dotenv.config({
  path: path.resolve(__dirname, '../.env.prod'),
});

// Grab APP_* environment variables
const envVars = Object.keys(process.env)
  .filter(key => /^APP_/i.test(key))
  .reduce(
    (env, key) => {
      env[key] = process.env[key];

      return env;
    },
    {
      NODE_ENV: 'production',
    }
  );

// If strings are not stringified, webpack will treat them as actual code
const stringifiedEnv = {
  'process.env': Object.keys(envVars).reduce((env, key) => {
    env[key] = JSON.stringify(envVars[key]);

    return env;
  }, {}),
};

const extractSass = new ExtractTextPlugin({
  filename: "css/[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  context: path.join(__dirname, '../src'),

  devtool: 'cheap-module-source-map',

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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
          // use style-loader in development
          fallback: 'style-loader',
        }),
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
    extractSass,
    new ExtractTextPlugin('css/bundle.[contenthash].css'),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new webpack.DefinePlugin(stringifiedEnv),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0,
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
