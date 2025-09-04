const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'widget-catalog.js',
    publicPath: '',
    library: {
      name: 'WidgetCatalog',
      type: 'window',
      export: 'default'
    },
  },
  devtool: isDev ? 'source-map' : false,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss'],
    modules: ['node_modules'],
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            sourceMap: isDev,
          },
        },
      },
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]___[hash:base64:5]',
              },
              sourceMap: isDev,
              importLoaders: 1,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(s?(a|c)ss)$/,
        exclude: /\.module\.(s(a|c)ss)$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'widget-catalog.css'
    }),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') })
  ],
  devServer: {
    static: path.resolve(__dirname, 'public'),
    port: 3000,
    hot: true,
    historyApiFallback: true,
  }
};
