// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const querystring = require("node:querystring");

//  Proxying all from localhost:3030 to the DEV environment.
const target = "https://apigw-comercial-des.axdesocp1.central.inditex.grp";

const commonProps = {
  changeOrigin: true,
  cookieDomainRewrite: "localhost",
  secure: false,
};

// const webPath = '/spagrene-standalone/api/srvgrene';
const webPath = "/";

const proxyCMPITSWS = {
  "/SPAGRENE/api/cmpitsws-jwt/api/v1/online/items": {
    ...commonProps,
    target,
    onProxyReq: (proxyReq, req) => {
      if ((req.method === "POST" || req.method === "PUT") && req.body) {
        const writeBody = (bodyData) => {
          proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
          proxyReq.write(bodyData);
        };

        // if contentType === 'application/x-www-form-urlencoded'
        writeBody(querystring.stringify(req.body));
      }
    },
  },

  "/SPAGRENE/api/cmpitsws-jwt/*": {
    ...commonProps,
    target,
  },
};

const proxyConfiguration = {
  ...proxyCMPITSWS,

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

  // "/api/rest/v1/*": {
  //   ...commonProps,
  //   target: "https://des-openshift.axdesocp1.central.inditex.grp/spagrene/api/srvgrene",
  //   headers: { Connection: "keep-alive" },
  //   onProxyReq: (proxyReq, req) => {
  //     console.log("Proxy rule is running api/rest rule");

  //     //  DEV_ENV_COOKIE.json is used to set Cookie header dynamically from DEV env.
  //     try {
  //       const cookie = JSON.parse(fs.readFileSync(path.join(__dirname, "DEV_ENV_COOKIE.json"), "utf8")).cookie;
  //       proxyReq.setHeader("Cookie", cookie);
  //     } catch (error) {
  //       console.log("Failed to read or parse DEV_ENV_COOKIE.json", error);
  //     }

  //     if (req.body) {
  //       let bodyData = JSON.stringify(req.body);

  //       // in case if content-type is application/x-www-form-urlencoded -> we need to change to application/json
  //       proxyReq.setHeader("Content-Type", "application/json");
  //       proxyReq.setHeader("origin", target);
  //       proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));

  //       // stream the content
  //       proxyReq.write(bodyData);
  //     }
  //   },
  // },

  [`${webPath}/api/cmpitsws-jwt/*`]: {
    ...commonProps,
    target,
    onProxyReq: (proxyReq, req, _res) => {
      if ((req.method === "POST" || req.method === "PUT")  && req.body) {
        const writeBody = (bodyData) => {
          proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
          proxyReq.write(bodyData);
        };

        // if contentType === 'application/x-www-form-urlencoded'
        writeBody(querystring.stringify(req.body));
      }
    },
  },
  [`${webPath}/api/capmaws-jwt/*`]: {
    ...commonProps,
    target,
  },

  // /iopcore/api/auth/permissions/authdata?fetchMetadataTypes=ROLES
  "/SPAGRENE/api/auth/permissions/authdata*": {
    ...commonProps,
    target: "https://comercial-pre.central.inditex.grp", // URL del servidor de destino
    onProxyReq: (proxyReq, req, res) => {
      console.log("Proxy rule is running for authdata endpoint");

      // relative to code folder
      const result = fs.readFileSync("./config/mocks/authData.json");
      console.log(result);

      res.send(JSON.parse(result));
    },

    // target: "https://comercial-pre.central.inditex.grp", // URL del servidor de destino
    // onProxyReq: (proxyReq) => {
    //   console.log("Proxy rule is running permissions");

    //   // Agregar cabecera de cookie si el archivo DEV_ENV_COOKIE.json existe
    //   try {
    //     const cookie = JSON.parse(fs.readFileSync(path.join(__dirname, "DEV_ENV_COOKIE.json"), "utf8")).cookie;
    //     proxyReq.setHeader("Cookie", cookie);
    //   } catch (error) {
    //     console.log("Failed to read or parse DEV_ENV_COOKIE.json", error);
    //   }
    // },
    // pathRewrite: {
    //   "^/SPAGRENE/api/auth/permissions/authdata": "/iopcore/api/auth/permissions/authdata",
    // },
  },

  // "/SPAGRENE/api/auth/permissions/authdata?fetchMetadataTypes=ROLES": {

  //   ...commonProps,
  //   // bypass: () => {
  //   //   // Retorna true para evitar la solicitud al servidor de destino
  //   //   return true;
  //   // },
  //   target: "https://comercial-pre.central.inditex.grp", // URL del servidor de destino
  //   onProxyReq: (proxyReq, req, res) => {
  //     console.log("Proxy rule is running for authdata endpoint 2");
  //     res.send(JSON.parse(fs.readFileSync("./server/authData.json")));
  //   },

  //   // target: "https://comercial-pre.central.inditex.grp", // URL del servidor de destino
  //   // onProxyReq: (proxyReq) => {
  //   //   console.log("Proxy rule is running permissions");

  //   //   // Agregar cabecera de cookie si el archivo DEV_ENV_COOKIE.json existe
  //   //   try {
  //   //     const cookie = JSON.parse(fs.readFileSync(path.join(__dirname, "DEV_ENV_COOKIE.json"), "utf8")).cookie;
  //   //     proxyReq.setHeader("Cookie", cookie);
  //   //   } catch (error) {
  //   //     console.log("Failed to read or parse DEV_ENV_COOKIE.json", error);
  //   //   }
  //   // },
  //   // pathRewrite: {
  //   //   "^/SPAGRENE/api/auth/permissions/authdata": "/iopcore/api/auth/permissions/authdata",
  //   // },
  // },
  [`${webPath}/api/cmpbpsws-jwt/*`]: { ...commonProps, target },

  [`${webPath}/web/*/v1/user-info`]: {
    ...commonProps,
    target,
    pathRewrite: (path) => path.replace(/.+api/, "/SPAGRENE/api/cmpbpsws-jwt/api"),
  },
};

module.exports = proxyConfiguration;
