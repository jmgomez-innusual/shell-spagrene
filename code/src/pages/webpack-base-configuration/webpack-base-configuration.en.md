## Webpack base configuration

AMIGA Framework Web base Webpack configuration gives teams the following features:

- Sets the code source to the `src` path.
- Sets the static assets folder to the `config/assets` path.
- Sets the code entry point to the `src/main.tsx` file.
- All files ending in `.raw.css` as loaded without PostCSS pre-processing.
- All files ending in `.css` (excluding the ones before) are loaded using PostCSS pre-processing.
- We also load `.md` files.
- Load the Monaco Editor webpack plugin.
- We define 3 import aliases:
  - `root`: that points towards the `code` path.
  - `@`: that points towards the `code/src` path.
  - `config`: that points towards the `code/config` path.
- Define a Webpack dev server that allows to develop on the LDE with HMR support (take into consideration, that in the case of using microfrontends the Hot-Reloading feature may not work correctly).

The full base config: