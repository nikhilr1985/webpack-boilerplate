const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

const extractPlugin = new ExtractTextPlugin({
  filename: "./assets/css/app.css"
});

const config = {
  //mode: "development",
  context: path.resolve(__dirname, "src"),
  entry: {
    app: "./app.js"
  },
  output: {
    // Output path using nodeJs path module
    path: path.resolve(__dirname, "dist"),
    //filename: "bundle.js"
    filename: "./assets/js/[name].bundle.js"
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist/assets/media"),
    stats: "errors-only",
    open: true,
    port: 9191,
    compress: true
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      //babel-loader
      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      },
      //html-loader
      { test: /\.html$/, use: ["html-loader"] },
      //css-loader
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, "src", "assets", "scss")],
        use: extractPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ],
          fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      template: "index.html"
    }),
    extractPlugin
  ]
};
module.exports = config;
