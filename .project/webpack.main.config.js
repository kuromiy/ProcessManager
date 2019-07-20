const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "../src/main/index.ts"),
  output: {
    filename: "index.js",
    path: path.join(__dirname, "../build")
  },
  target: "electron-main",
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
          configFile: path.join(__dirname, "../tsconfig.json")
        }
      }
    ]
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: [".ts", ".js"]
  }
}
