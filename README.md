# app-package-name

Shell to contain remotes 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

To get started just run the following commands (allways from the `root` of the project):

**Configure the cookie**

We have had some problems when configuring the login, so the solution is to log in to the development environment (https://comercial-pre.central.inditex.grp/iopcore), copy the session cookie from the application->cookies tab of the devtools and copy it to the following file:

```
code\config\DEV_ENV_COOKIE.json
```

The content of the file should be:
```
{
    "cookie": "session=cookie-here"
}
```

Take into consideration that this cookie will expire and you should refresh it on a 401 error

**Start SPA**

```
cd code
npm install
npm run start
```

## Development

> Make sure all this commands are executed from the `code` folder.

### Build & Packaging

You dont need to build or test this project as long as is just a test project.

### Code Linting

We use [ESLint](https://eslint.org/) to lint the code, to lint the code just run:

```
npm run lint
```

If you want to auto-fix the linting issues found, just run:

```
npm run lint:fix
```

If you want to format your code following the [Prettier standard](https://prettier.io/) just run:

```
npm run format
```

### Git Hooks

By default there is only configured the `pre-commit` hook, in this hook we just check for linting issues on the staged files following this pattern `(config|src|test)/**/*.(js|jsx)`.

To setup the execution of the hooks, just run:

```
npm run dev:setup
```

### Versioning

We use [SemVer](http://semver.org/) for versioning.
