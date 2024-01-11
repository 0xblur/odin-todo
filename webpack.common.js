const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/app.js",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      title: "TuDuApp",
      filename: "index.html",
      inject: "body",
    })
  ],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname + "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
}
