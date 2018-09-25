// server method with dynamic configuration
const express = require('express')
const cors = require('cors');

const listenPort = (service, port) => {
  service.listen(port, (err, res) => {
    console.log("err:", err, "res:", res);
  });
};

const setCors = (service) => {
  service.use(cors());
};

const serPrefix = (service, router, prefix) => {
  service.use(`/${prefix}`, router);
};

// set dynamic routes with configuration
const setRoutes = (service, config) => {
  const router = express.Router();
  const apis = config.apis;
  const prefix = config.prefix;

  // set prefix to a specific mock server
  setPrefix(service, router, prefix);

  // create routes
  apis.forEach((api) => {
    service[api.method](`/${api.path}`, (req, res) => {
      setTimeout(() => {
        // return status
        res.sendStatus(api.resCode.slice(0, 3));

        // set headers
        if (api.response.headers.length > 0) {
          api.response.headers.forEach((header) => {
            res.set(header.key, header.value);
          })
        }

        // set cookies
        if (api.response.cookies.length > 0) {
          api.response.cookies.forEach((cookie) => {
            res.cookie(cookie.key, cookie.value);
          })
        }

        // return json data
        res.json(JSON.parse(api.response.body.value));
      }, parseInt(api.latency));
    })
  })
};

export default const start = (config) => {
  const service = express();
  const port = config.port;

  listenPort(service, port);
  setCors(service);
  setRoutes(service, config)
};
