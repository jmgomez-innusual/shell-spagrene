// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

const commonProps = {
  changeOrigin: true,
  cookieDomainRewrite: "localhost",
  secure: false,
};

const proxyConfiguration = {
  "/SPAGRENE/api/auth/permissions/authdata*": {
    ...commonProps,
    target: "https://comercial-pre.central.inditex.grp", // URL del servidor de destino
    onProxyReq: (proxyReq, req, res) => {
      console.log("Proxy rule is running for authdata endpoint");

      // relative to code folder
      const result = fs.readFileSync("./config/mocks/authData.json");

      res.send(JSON.parse(result));
    },
  },

  "/SPAGRENE/api/auth/validate/session": {
    ...commonProps,
    target: "https://des-openshift.axdesocp1.central.inditex.grp/spagrene/api/auth/validate/session",
    onProxyReq: (proxyReq, req, res) => {
      // Simular una respuesta "200 OK" en lugar de enviar la solicitud al servidor de destino
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end('{"message": "Proxy bypassed with 200 OK"}');
    },
  },

  // https://localhost:3029/bff-iopcore/spagrene/api/srvgrene/api/rest/v1/block/edit/session/4fc003fa-8882-4c3d-9b36-cd0a24b8921a
  // to https://apigw-comercial-des.axdesocp1.central.inditex.grp/bff-iopcore/srvgrene/api/rest/v1/block/edit/session/{param_1}
  //bff-iopcore context
  "/bff-iopcore/spagrene/api/srvgrene/*": {
    ...commonProps,
    target: "https://apigw-comercial-des.axdesocp1.central.inditex.grp/bff-iopcore/srvgrene",
  },

  "/api/rest/v1/block/edit/session/*": {
    ...commonProps,
    target: "https://des-openshift.axdesocp1.central.inditex.grp/spagrene/api/srvgrene",
    onProxyReq: (proxyReq, req, res) => {
      // eslint-disable-next-line no-console
      console.log("Proxy rule is running for session endpoint (onproxyreq)");
      // eslint-disable-next-line no-console
      // eslint-disable-next-line no-console
      res.send(JSON.parse(fs.readFileSync("./config/mocks/session.json")));
    },
  },

  "/api/cmpitsws-jwt/api/v1/online/items": {
    ...commonProps,
    target: "https://des-openshift.axdesocp1.central.inditex.grp/spagrene/api/srvgrene",
    onProxyReq: (proxyReq, req, res) => {
      // eslint-disable-next-line no-console
      console.log("Proxy rule is running for online/items");
      res.send(JSON.parse(fs.readFileSync("./config/mocks/items.json")));
    },
  },

  "/api/rest/v1/market": {
    ...commonProps,
    target: "https://des-openshift.axdesocp1.central.inditex.grp/spagrene/api/srvgrene",
    onProxyReq: (proxyReq, req, res) => {
      // eslint-disable-next-line no-console
      console.log("Proxy rule is running for market");
      res.send(JSON.parse(fs.readFileSync("./config/mocks/market.json")));
    },
  },

  "/api/rest/v1/store": {
    ...commonProps,
    target: "https://des-openshift.axdesocp1.central.inditex.grp/spagrene/api/srvgrene",
    onProxyReq: (proxyReq, req, res) => {
      // eslint-disable-next-line no-console
      console.log("Proxy rule is running for store");
      res.send(JSON.parse(fs.readFileSync("./config/mocks/store.json")));
    },
  },
};

module.exports = proxyConfiguration;
