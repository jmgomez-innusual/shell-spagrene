## Configuración base de Webpack

AMIGA Framework Web entrega una configuración base de Webpack que entrega las siguientes funcionalidades:

- Define que el código fuente este en la carpeta `src`.
- Define que los estaticos se encuentran en la carpeta `config/assets`.
- Define como punto de entrada al archivo `src/main.tsx`.
- Todos los archivos finalizados en `.raw.css` son cargados sin pre-procesamiento de PostCSS.
- Todos los archivos finalizados en `.css` (excluyendo los anteriores) son cargados usando pre-procesamiento de PostCSS.
- Tambien permitimos la carga de archivos `.md` (markdown).
- Cargamos el plugin de webpack del editos Monaco.
- Se definen 3 alias de import:
  - `root`: que apunta hacia la carpeta base, en este caso `code`.
  - `@`: que apunta hacia la carpeta `code/src`.
  - `config` que apunta hacia la carpeta `code/config`.
- Se define un servidor de desarrollo de Webpack que permite el desarrollo en el entorno local con HMR (tomar en cuenta que en el caso de microfrontends HMR puede no funcionar correctamente).

La configuración base completa es: