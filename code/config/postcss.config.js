// postcss-loader config (loader used by webpack)
// https://github.com/postcss/postcss-loader#configuration
module.exports = {
  plugins: [
    // Inlining of @import sentences
    // https://github.com/postcss/postcss-import
    "postcss-import",
    // Mixins support
    // https://github.com/postcss/postcss-mixins
    "postcss-mixins",
    // Polyfills depending on stage/browser
    // https://github.com/csstools/postcss-preset-env
    [
      "postcss-preset-env",
      {
        stage: 3,
        features: {
          "nesting-rules": true,
          "custom-media-queries": true,
        },
        browsers: "last 2 versions",
      },
    ],
    // Inlining, copy or rebase of url() sentences
    // https://github.com/postcss/postcss-url
    "postcss-url",
    // Utilities to simplify style definition
    // https://github.com/ismamz/postcss-utilities
    "postcss-utilities",
    // Advanced support for svg inlining
    // https://github.com/TrySound/postcss-inline-svg
    ["postcss-inline-svg", { removeFill: true }],
    // CSS compression
    // https://cssnano.co/
    "cssnano",
  ],
};
