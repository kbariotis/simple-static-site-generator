const path = require('path');

const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const glob = require('glob');

const files = glob.sync('./pages/**/*.html').map(file => file.replace('./pages', ''));

module.exports = {

  entry: {
    compiler: './compiler.js',
    scss: './assets/scss/boot.scss'
  },

  output: {
    filename: '[name].[hash].js',
    path: path.resolve('dist'),
    libraryTarget: 'umd'
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },

  plugins: [
    new StaticSiteGeneratorPlugin({
      paths: files,
      locals: {
        greet: 'Hello'
      }
    }),

    new ExtractTextPlugin('[hash].css')
  ]

};
