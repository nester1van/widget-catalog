const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'widget-catalog.js',
    library: {
      name: 'WidgetCatalog',
      type: 'umd',
      export: 'default'
    },
    globalObject: 'this'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  externals: {},
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/ },
      { test: /\.s[ac]ss$/i, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
      { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      { test: /\.(png|jpe?g|gif|svg)$/, type: 'asset/resource' }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'widget-catalog.css' }),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html'), inject: true })
  ],
  devServer: {
    static: path.resolve(__dirname, 'public'),
    port: 3000,
    hot: true
  }
};
