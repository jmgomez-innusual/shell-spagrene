const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const cors = require("cors");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const { devServer, inProject, addModuleFederation } = require("@amiga-fwk-web/tools/dev");
const AmigaAssetsPlugin = require("@amiga-fwk-web/tools/config/webpack.amiga-assets-plugin.js");
const microfrontendsConfig = require("./webpack.microfrontends.js");
// Extracted from https://github.com/andrewbents/typescript-transformer-jsx-remove-data-test-id
// which has no support for TypeScript 4.0
const ts = require("typescript");

const devServerProxy = require("./webpack.proxy-configuration");

const removeDataTestIdTransformer = () => (context) => {
  const visit = (node) =>
    ts.isJsxAttribute(node) && ["data-test-id", "data-testid"].includes(node.name.getText())
      ? undefined
      : ts.visitEachChild(node, visit, context);

  return (node) => ts.visitNode(node, visit);
};

// Webpack configuration for both development and production bundles, and for the
// local development server
// https://webpack.js.org/configuration/
module.exports = (env, args) => {
  // Modes: development vs production based on the CLI option --devel/--prod (-d/-p)
  const mode = args.mode || "development";
  const dev = mode === "development";

  // Detect if this is a build or the development server
  const server = /webpack-dev-server/.test(args["$0"]);

  // Helper to create paths relative to the project's root path
  const projectPath = (...p) => path.join(process.cwd(), ...p);

  // Helpers to conditionaly find/require files inside the project
  const { findFile, requireFile } = inProject(projectPath());

  const babelConfig = requireFile("<root>/config/babel.config.js", "<framework>/babel.config.js");

  process.env.COVERAGE_ENABLED && babelConfig.plugins.push("istanbul");

  // Path where framework static assets are located
  const frameworkAssetsPath = findFile("<root>/config/assets", "<framework>/assets");

  // Where to emit amiga static assets
  const amigaAssetsDest = "amiga/";

  const webpackConfig = {
    // Set the source's search context to the 'src' folder
    context: projectPath("src"),

    // Bundle entrypoints
    // By default we use a single bundle that includes both the polyfills and the application.
    // A special snippet is prefixed to ensure that all assets loaded by webpack honour the
    // base context set for the application
    entry: {
      bundle: [
        findFile("<root>/config/webpack.context.js", "<framework>/webpack.context.js"),
          "./polyfills.ts",
          "./main.tsx",
      ],
    },

    // Mode: development or production (detected at line 20)
    mode,

    output: {
      // Build target folder. By default dist/dev for development mode
      // and dist/prod for production mode.
      // It' overwritten by the --output option of amiga-fwk-web build
      ...(env.WEBPACK_SERVE ? {} : { path: path.resolve(process.env.AMG_CLI_OUTPUT_PATH || projectPath("dist")) }),
      filename: "[name].[contenthash].js",
      publicPath: "",
      assetModuleFilename: "assets/[name].[contenthash][ext][query]",
    },

    // Source maps generation. Disabled in production.
    // https://webpack.js.org/configuration/devtool/
    devtool: dev ? "eval-source-map" : false,

    module: {
      rules: [
        // Babel loader for transpilation
        // - Transpilate al .js and .jsx files
        // - Exclude all dependencies except for framework packages. Allow customization.
        // - Babel configuration is set at the babel.config.js file
        // - Do not require file extension to be specified
        {
          test: /\.jsx?$/,
          exclude: requireFile(
            "<root>/config/webpack.babel-loader-exclude.js",
            "<framework>/webpack.babel-loader-exclude.js",
          ),
          use: {
            loader: "babel-loader",
            options: {
              ...babelConfig,
              envName: mode,
            },
          },
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.ts(x?)$/,
          use: [
            ...(process.env.COVERAGE_ENABLED === "test" ? [
              {
                loader: "babel-loader",
                options: {
                  ...babelConfig,
                  envName: mode,
                },
              }
            ]: []),
            {
              loader: "ts-loader",
              options:
                args.mode === "production"
                  ? {
                      getCustomTransformers: () => ({
                        before: [removeDataTestIdTransformer()],
                      }),
                    }
                  : {},
            },
          ],
        },
        // Exclude some CSS files from PostCSS processing
        {
          test: /\.raw\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            "css-loader",
          ],
        },
        
        // Styles loader
        // - Combine all CSS into one single bundle.css file
        // - Support standard CSS
        // - Support PostCSS extensions (https://postcss.org/) configured at the postcss.config.js file
        {
          test: /\.css$/,
          exclude: /\.raw\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  config: findFile("<root>/config/postcss.config.js", "<framework>/postcss.config.js"),
                },
              },
            },
          ],
        },

        // SVGR. Import SVG files as React components
        {
          test: /\.icon\.svg$/,
          use: {
            loader: "@svgr/webpack",
            options: {
              icon: true,
            },
          },
        },

        // Asset Module
        {
          test: /\.(woff|woff2|ttf|eot|otf|svg|jpe?g|png|gif)$/i,
          exclude: /\.icon\.svg$/,
          type: "asset/resource",
        },

        // Load markdown files
        {
          test: /\.md$/i,
          use: 'raw-loader',
        },
      ],
    },

    // Import resolutions
    resolve: {
      // Fix to avoid problems wih node/browser compatible libraries that
      // unconditionally require some node only deps (u_u)
      fallback: {
        fs: false,
        // Ugly Hack to avoid problems with react-markdown (╯°□°）╯︵ ┻━┻
        process: path.dirname(require.resolve("process/")),
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
      },

      // No need to include the extension part when importing these type of files
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],

      // Search paths for absolute path imports:
      // - Project's root folder
      // - Project's src folder
      // - Project's node_modules
      modules: [process.cwd(), projectPath("src"), "node_modules"],

      // Aliases for absolute path imports:
      // import "root/x" - from the project's root folder
      // import "@/x" - from the project's src folder
      // import "config/x" - from the project's config folder
      alias: {
        root: projectPath(),
        "@": projectPath("src"),
        config: projectPath("config"),
      },
    },

    plugins: [
      // Combine all generated styles into a single bundle.css file
      new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),

      // Generate the index.html templates for the development server and SPA+Backend deployment
      new HtmlWebpackPlugin({
        // Do not inject references to the webpack generatad js/css bundles. It will be done
        // manually in the template
        inject: false,

        // Add hashes to the bundle references to invalidate caching
        hash: true,

        // ejs template to use. Search following this order:
        // - a config/index.html.ejs file inside the project
        // - the framework's default template
        template: findFile("<root>/config/index.html.ejs", "<framework>/index.html.ejs"),

        // Name of the generated template file
        filename: "index.html",

        // Additional variables that will be available for interpolation in the template

        // Application context. By default /. Can be overriden using the --base-path CLI option
        amigaBasePath: process.env.AMG_CLI_BASE_PATH || "/",

        // Initial application state set as global window variables. Only available in server mode.
        state: server ? requireFile("<root>/config/server/state.js", "<framework>/server/state.js") : {},
      }),

      // Generate a GO index.html.tmpl template for standalone deploys
      !server &&
        new HtmlWebpackPlugin({
          inject: false,
          hash: true,
          template: findFile("<root>/config/index.html.ejs", "<framework>/index.html.ejs"),
          filename: "index.html.tmpl",
          amigaBasePath: "{{.app.spa.context_path}}",
        }),

      // Tell webpack not to require jQuery. If a project uses jQuery it must include a
      // <script> tag in the template
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",

        // Node.js polyfills
        process: "process/browser",
      }),

      // Prune from the bundle the unneeded validator-js locales.
      // Framework supported "es" and "en" locales are bundled by default
      new webpack.ContextReplacementPlugin(/validatorjs[\/\\]src[\/\\]lang/, /es|en/),

      // Environment variables inlined in the transpiled code
      new webpack.EnvironmentPlugin({
        NODE_ENV: process.env.NODE_ENV || "development",
        AMIGA_FWK_WEB_APP_VERSION: require("../package.json").version,
      }),

      // Output gzip version of the assets
      !server && new CompressionPlugin({}),

      // Analyze bundle if needed
      process.env.AMG_CLI_ANALYZE_BUNDLE && new BundleAnalyzerPlugin(),

      // Copy framework favicon assets to the bundle.  Emitted to their own
      // <amigaAssetsDest> directory to simplify further processing
      new CopyWebpackPlugin({
        patterns: [
          {
            from: frameworkAssetsPath,
            to: `${amigaAssetsDest}[path][name].[contenthash][ext]`,
            noErrorOnMissing: true,
          },
        ],
      }),

      new AmigaAssetsPlugin({ assetsRoot: `${amigaAssetsDest}` }),

      new MonacoWebpackPlugin(),
    ].filter((x) => x),

    // Optimize code splitting to extract shared chunks (i.e. the shared node_modules)
    optimization: {
      splitChunks: {
        // include all types of chunks
        chunks: "all",
      },
    },

    // Fix to avoid problems in windows with the d3 dependency (u_u)
    externals: [
      {
        xmlhttprequest: "{XMLHttpRequest:XMLHttpRequest}",
      },
    ],

    // Tune the webpack console feedback
    stats: {
      colors: true,
      children: true,
    },

    devServer: {
      // Host to bind the development server to
      // Set by the amiga-fwk-web server -H option or 0.0.0.0 by default
      host: process.env.AMG_CLI_HOST || "0.0.0.0",

      // Development server port
      // Set by the amiga-fwk-web server -p option or 3030 by default
      port: process.env.AMG_CLI_PORT || 3030,

      devMiddleware: {
        // Serve the app under the context path set by the --base-path CLI
        // option or "" by default.
        publicPath: process.env.AMG_CLI_BASE_PATH,
      },

      // Fallback unknown URL requests to the index.html
      // Mandatory for the SPA router to work. It honours the context set by the --base-path CLI option.
      historyApiFallback: {
        verbose: true,
        index: process.env.AMG_CLI_BASE_PATH ? `${process.env.AMG_CLI_BASE_PATH}index.html` : "/index.html",
      },

      // Enable Hot Module Replacement
      // https://webpack.js.org/concepts/hot-module-replacement
      hot: true,

      // Disable compression
      compress: false,

      // Show an overlay in the browser in case of build errors/warnings
      client: {
        overlay: {
          errors: true,
          warnings: true,
          runtimeErrors: false,
        },
      },

      // Enable HTTPS support (--https CLI param)
      ...(process.env.AMG_HTTPS && {
        server: {
          type: "https",
          options: {
            key: fs.readFileSync(path.join(__dirname, "certificate.key")),
            cert: fs.readFileSync(path.join(__dirname, "certificate.crt"))

//            key: fs.readFileSync(require.resolve("@amiga-fwk-web/tools-cli-certs/amiga-fwk-web-server.key")),
//            cert: fs.readFileSync(require.resolve("@amiga-fwk-web/tools-cli-certs/amiga-fwk-web-server.crt")),
          },
        },
      }),

      // Additional configuration for the express development server
      setupMiddlewares: (middlewares, { app }) => {
        // Setup CORS on LDE
        app.use(cors({
          origin: true,
        }));
        
        // Support for request body parsing (JSON and x-www-form-urlencoded)
        devServer.enableBodyParsing(app);

        // Enable the server request log if the amiga-fwk-web-server -v options are used
        process.env.AMG_CLI_VERBOSE && devServer.enableLog(app);

        // Return an empty favicon.ico
        devServer.mockFavicon(app, process.env.AMG_CLI_BASE_PATH);

        // Add the `/config.amg` endpoint that returns the configuration stored at
        // <root>/config_paas/configmap{,_local}.yml if present
        // Notice that the configmap file can be overridden using the --configmap CLI option
        devServer.mockConfig(app, projectPath(), process.env.AMG_CLI_BASE_PATH);

        // Add to the dev server the user defined endpoints from
        // <root>/config/setup.js. If missing, use the framework default ones
        // (only the /credentials endpoint will be defined)
        const mockCustom = requireFile("<root>/config/server/setup.js", "<framework>/server/setup.js");
        mockCustom(app);

        app.get("/", (_, res) => {
          res.redirect(process.env.AMG_CLI_BASE_PATH);
        });

        // Enable the JSON mock backend (JSON API) unless disabled by the user
        if (!process.env.AMG_CLI_DISABLE_JSON_API) {
          // - response delay based on the CLI param
          devServer.mockJsonBackend(app, projectPath(), {
            delay: process.env.AMG_CLI_API_DELAY,
          });
        }

        return middlewares;
      },
      proxy: {
        ...devServerProxy
      }

    },
  };

  return addModuleFederation(webpackConfig, microfrontendsConfig());
};
