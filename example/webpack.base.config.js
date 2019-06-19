const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.[hash].js",
    path: path.join(__dirname, "/dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        enforce: "pre",
        use: [
          {
            options: {
              exclude: /node_modules/,
              ignore: false,
              emitError: true,
              useEslintrc: true
            },
            loader: require.resolve("eslint-loader")
          }
        ],
        exclude: [/[/\\\\]node_modules[/\\\\]/, /html/, /images/]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [["@babel/plugin-proposal-class-properties"], ["import", { libraryName: "antd", style: "css" }]]
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
}
