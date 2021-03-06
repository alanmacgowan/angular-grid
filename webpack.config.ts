import * as webpack from 'webpack';
import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';
import { AotPlugin } from '@ngtools/webpack';
import * as OfflinePlugin from 'offline-plugin';
var CopyWebpackPlugin = require('copy-webpack-plugin');

export default (environment = 'development') => {

  const { ifProduction, ifDevelopment } = getIfUtils(environment);

  return {
    devtool: ifProduction('source-map', 'eval'),
    entry: path.join(__dirname, 'demo', 'entry.ts'),
    output: {
      filename: ifProduction('[name]-[chunkhash].js', '[name].js')
    },
    module: {
      rules: removeEmpty([ifDevelopment({
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      }), ifDevelopment({
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true
        }
      }, {
        test: /\.ts$/,
        loader: '@ngtools/webpack'
      }), {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader']
      }, {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=10000',
      }])
    },
    resolve: {
      extensions: ['.ts', '.js', '.css']
    },
    devServer: {
      port: 8000,
      inline: true,
      hot: true,
      historyApiFallback: true,
      overlay: true
    },
    plugins: removeEmpty([
      ifProduction(new webpack.optimize.ModuleConcatenationPlugin()),
      ifProduction(new AotPlugin({
        tsConfigPath: './tsconfig-demo.json'
      })),
      ifDevelopment(new webpack.HotModuleReplacementPlugin()),
      ifDevelopment(new ForkTsCheckerWebpackPlugin({
        watch: ['./src', './demo'],
        formatter: 'codeframe'
      })),
      new webpack.DefinePlugin({
        ENV: JSON.stringify(environment)
      }),
     new CopyWebpackPlugin([{
        from: './demo/books.json',
        to: '.'
    }]),
      ifProduction(new webpack.optimize.UglifyJsPlugin({
        sourceMap: true
      })),
      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        path.join(__dirname, 'src')
      ),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'demo', 'index.ejs')
      }),
      ifProduction(new OfflinePlugin())
    ])
  };
};
