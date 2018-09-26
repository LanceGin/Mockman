/**
  * serverService class to generate and configure express server
  * @dependecies { express, cors }
  *
  */
const express = require('express');
const cors = require('cors');

export default class serverService {
  /**
    * initial and start an express instance with configration
    *
    * @params { config } 
    * @desc all configration of an express instance, include routes, port,
    *       latancy, response, request etc.
    *
    */
  static start(config) {
    const service = express();
    const port = config.port;

    this.setCors(service);
    this.setRoutes(service, config);
    this.listenPort(service, port);
  }

  /**
    * set CORS to the express instance
    *
    * @params { service } 
    * @desc the express instance
    *
    */
  static setCors(service) {
    service.use(cors());
  }

  /**
    * set globle prefix to an express instance
    *
    * @params { service } 
    * @desc the express instance
    * @params { router } 
    * @desc main router of the express instance
    * @params { prefix } 
    * @desc prefix string
    *
    */
  static setPrefix(service, router, prefix) {
    service.use(`/${prefix}`, router);
  }

  /**
    * set routes to an express instance
    *
    * @params { service } 
    * @desc the express instance
    * @params { config } 
    * @desc all configration of an express instance, include routes, port,
    *       latancy, response, request etc.
    *
    */
  static setRoutes(service, config) {
    const router = express.Router();
    const apis = config.apis;
    const prefix = config.prefix;

    // set prefix to a specific mock server
    this.setPrefix(service, router, prefix);

    // create routes
    apis.forEach((api) => {
      service[api.method](`/${api.path}`, (req, res) => {
        setTimeout(() => {
          // return status
          res.status(api.resCode.slice(0, 3));

          // set headers
          if (api.response.headers.length > 0) {
            api.response.headers.forEach((header) => {
              res.set(header.key, header.value);
            });
          }

          // set cookies
          if (api.response.cookies.length > 0) {
            api.response.cookies.forEach((cookie) => {
              res.cookie(cookie.key, cookie.value);
            });
          }

          // return json data
          res.json(JSON.parse(api.response.body.value));
        }, parseInt(api.latency, 10));
      });
    });
  }

  /**
    * set port to an express instance
    *
    * @params { service } 
    * @desc the express instance
    * @params { port } 
    * @desc port string
    *
    */
  static listenPort(service, port) {
    service.listen(port, (err, res) => {
      console.log('err:', err, 'res:', res);
    });
  }
}
