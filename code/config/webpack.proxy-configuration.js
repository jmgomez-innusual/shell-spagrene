// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

const commonProps = {
  changeOrigin: true,
  cookieDomainRewrite: "localhost",
  secure: false,
};

const proxyConfiguration = {
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
};

module.exports = proxyConfiguration;
