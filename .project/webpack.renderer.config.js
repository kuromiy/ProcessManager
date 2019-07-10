const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "../src/renderer/app.ts"),
  output: {
    filename: "renderer.js",
    path: path.join(__dirname, "../dist")
  },
  target: "electron-renderer",
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: [/node_module/],
        options: {
          appendTsSuffixTo: [/\.vue$/],
          configFile: path.join(__dirname, "../tsconfig.json")
        }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: ["url-loader"]
      }
    ]
  },
  resolve: {
    alias: {
      "vue$": "vue/dist/vue.common.js",
    },
    extensions: [".ts", ".js", ".vue", ".css"],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "../src/index.template.html")
    }),
    new MiniCssExtractPlugin({
      filename: "index.css"
    })
  ]
}
