/* eslint-disable */
var publicPath = window.AMIGA_FWK_WEB_CONTEXT_PATH || "/";

if (!/\/$/.test(publicPath)) {
  publicPath = publicPath + "/";
}

__webpack_public_path__ = publicPath;

const defaultTagInjector = (linkTag) => {
  document.querySelector("head").appendChild(linkTag);
};

window.linkTagInjectors = new Proxy(
  {},
  {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      }

      return defaultTagInjector;
    },
  },
);