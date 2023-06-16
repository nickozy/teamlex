const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const target = "browserslist";
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  target,
  mode: "production",
  devtool: "source-map",
  plugins: [new MiniCssExtractPlugin()],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin(),
    ],
    minimize: true,
  },
};
