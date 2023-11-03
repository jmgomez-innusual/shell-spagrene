## Setup Sass

It's easy to setup Sass, just follow the instructions contained in this page.

### Install Sass Dependencies

First we need to add the Sass dependencies to the project. In this case we need to install `sass` and `sass-loader` dependencies by executing the following command from `<root>/code`:

```bash
npm install -D sass-loader sass 
```

### Add the Sass loader onto the Webpack configuration

We now need to configure the `sass-loader` loader onto your Webpack configuration.

First, open the file `webpack.config.js` file on the editor of your choice, it's located at `<root>/code/config`. Add to the `module.rules` property of your Webpack configuration this module loader for sass files:

```javascript
{
  test: /\.s[ac]ss$/,
  use: [
    {
      loader: require("mini-css-extract-plugin").loader,
    },
    {
      loader: "css-loader",
      options: {
        importLoaders: 2,
      },
    },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          config: findFile("<root>/config/postcss.config.js", "<framework>/postcss.config.js")
        },
      },
    },
    "sass-loader",
  ],
}
```

We recommend add it before the `css` styles loader.

For more info check the Webpack [sass-loader](https://webpack.js.org/loaders/sass-loader) documentation.