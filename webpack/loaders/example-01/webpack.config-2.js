const path = require("path");

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [{
      test: /\.muji$/,
      use: [
        {
          loader: path.resolve("./loaders/myLoader.js"),
        }
      ]
    }]
  },
};
