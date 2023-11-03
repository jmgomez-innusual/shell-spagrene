// Babel configuration
// https://babeljs.io/docs/en/configuration
// https://babeljs.io/docs/en/options
module.exports = {
  presets: [
    [
      // Configure the transpilation based on the target browsers
      // https://babeljs.io/docs/en/babel-preset-env
      "@babel/preset-env",
      {
        // Support latest two versions of each browser
        targets: {
          browsers: ["last 2 versions"],
        },
        // Polyfills will be added explicitely to the bundle. Babel will
        // select which basic polyfills (core-js and regenerator/runtime) will
        // be imported based on the target browsers.
        // https://babeljs.io/docs/en/babel-preset-env#usebuiltins-entry
        useBuiltIns: "entry",
        corejs: 3,

        // Do not transpile import syntax to let Webpack handle
        // the imports (and allow tree shaking).
        // https://babeljs.io/docs/en/babel-preset-env#modules
        // Transpile only in test mode, required by Jest.
        modules: process.env.NODE_ENV === "test" ? "auto" : false,
      },
    ],
    // JSX and React support
    // https://babeljs.io/docs/en/babel-preset-react
    "@babel/react",
  ],
  // Extra plugins to support non standard syntax
  plugins: [
    // Class properties (stage-3)
    // https://babeljs.io/docs/en/babel-plugin-proposal-class-properties
    // https://github.com/tc39/proposal-class-fields
    // https://github.com/tc39/proposal-static-class-features
    "@babel/plugin-proposal-class-properties",
    // export * as x from (stage-4)
    // https://babeljs.io/docs/en/babel-plugin-proposal-export-namespace-from
    // https://github.com/tc39/proposal-export-ns-from
    "@babel/plugin-proposal-export-namespace-from",
    ...(process.env.COVERAGE_ENABLED === "test" ? ["istanbul"] : []),
  ],
  env: {
    production: {
      // Remove data-test-id properties from JSX in production
      // https://github.com/coderas/babel-plugin-jsx-remove-data-test-id#readme
      plugins: [["babel-plugin-jsx-remove-data-test-id", { attributes: ["data-testid"] }]],
    },
  },
};
