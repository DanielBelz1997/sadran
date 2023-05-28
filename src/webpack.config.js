const path = require("path");

module.exports = {
  entry: "./src/index.js", // Update with the entry file path for your project
  output: {
    path: path.resolve(__dirname, "dist"), // Update with the output directory path for your project
    filename: "bundle.js", // Update with the desired output bundle file name
  },
  resolve: {
    fallback: {
      fs: false,
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      path: require.resolve("path-browserify"),
    },
  },
};
