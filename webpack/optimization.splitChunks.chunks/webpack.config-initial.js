const path = require("path");

module.exports = {
  entry: {
    a: "./src/a.js",
    b: "./src/b.js",
  },
  output: {
    path: path.resolve(__dirname, "dist-initial"),
    filename: "[name].bundle.js",
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "initial"
    }
  }
};
