const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Check if .env file exists
if (!fs.existsSync('.env')) {
  throw new Error('Environment variable file (.env) does not exist.');
}

// Initialize environment variables
dotenv.config();

// Grab APP_* environment variables
const envVars = Object.keys(process.env)
  .filter(key => /^APP_/i.test(key))
  .reduce(
    (env, key) => {
      env[key] = process.env[key];

      return env;
    },
    {
      NODE_ENV: 'development',
    }
  );

// If strings are not stringified, webpack will treat them as actual code
const stringifiedEnv = {
  'process.env': Object.keys(envVars).reduce((env, key) => {
    env[key] = JSON.stringify(envVars[key]);

    return env;
  }, {}),
};

const server = {
  PORT: process.env.APP_PORT || '8000',
  HOST: process.env.APP_HOST || '0.0.0.0',
};

module.exports = {
  context: path.join(__dirname, '../src'),

  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    compress: true,
    port: server.PORT,
    host: server.HOST,
    historyApiFallback: true,
    contentBase: path.join(__dirname, '../dist'),
  },

  entry: [
    `webpack-dev-server/client?http://${server.HOST}:${server.PORT}`, // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors,
    'babel-polyfill',
    './index.js',
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['css-hot-loader'].concat(
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader',
          })
        ),
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
    new webpack.DefinePlugin(stringifiedEnv),
    new webpack.HotModuleReplacementPlugin(),
  ],

  resolve: {
    modules: [path.join(__dirname, '../node_modules')],
  },
};
