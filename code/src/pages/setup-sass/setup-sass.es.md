## Configurar Sass

Es fácil configurar Sass, simplemente siga las instrucciones contenidas en esta página.

### Instalar dependencias de Sass

Primero necesitamos agregar las dependencias de Sass al proyecto. En este caso, necesitamos instalar las dependencias `sass` y `sass-loader`, ejecutando el siguiente comando desde `<root>/code`:

```bash
npm install -D sass-loader sass 
```

### Agregue el loader de Sass a la configuración de Webpack

Ahora necesitamos configurar el loader `sass-loader` en su configuración de Webpack.

Primero, abra el archivo `webpack.config.js` en el editor de su elección. Este archivo se encuentra en `<root>/code/config`. Agregue a la propiedad `module.rules` de la configuración de su Webpack este cargador de módulos para archivos Sass:

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

Recomendamos agregarlo antes del cargador de estilos `css`.

Para obtener más información, consulte la documentación de Webpack [sass-loader] (https://webpack.js.org/loaders/sass-loader).