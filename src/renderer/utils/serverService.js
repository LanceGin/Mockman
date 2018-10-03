/**
  * serverService class to generate and configure express server
  * @dependecies { express, cors }
  *
  */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

export default class serverService {
  /**
    * initial and start an express instance with configration
    *
    * @params { config }
    * @desc all configration of an express instance, include routes, port,
    *       latancy, response, request etc.
    *
    */
  static start(config, self) {
    const service = express();
    const formData = multer();
    const port = config.port;

    this.parseBody(service, formData);
    this.setCors(service);
    this.setRoutes(service, config);

    const serviceIns = service.listen(port);

    if (serviceIns.listening === true) {
      config.serviceIns = serviceIns;
      config.status = 'running';
      config.startedAt = new Date();
    } else {
      self.$message.error('cannot start the server, check the configration');
    }
  }

  /**
    * stop an express instance
    *
    * @params { config }
    * @desc all configration of an express instance, serverIns is required
    *
    */
  static stop(config) {
    const serviceIns = config.serviceIns;
    serviceIns.close();
    config.status = 'stop';
    config.serviceIns = null;
    config.startedAt = null;
  }

  /**
    * parse the body formData in a requst
    *
    * @params { service }
    * @desc the express instance
    *
    * @params { formData }
    * @desc multer object
    *
    */
  static parseBody(service, formData) {
    service.use(bodyParser.json());
    service.all('/*', formData.array());
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
    const emumReqRes = {
      body: 'body',
      headers: 'headers',
      params: 'query',
    };

    // set prefix to a specific mock server
    this.setPrefix(service, router, prefix);

    // create routes
    apis.forEach((api) => {
      service[api.method](`/${api.path}`, (req, res) => {
        const errorDetails = [];
        setTimeout(() => {
          // check required params, body form data and headers
          Object.keys(api.request).forEach((item) => {
            if (api.request[item].length > 0) {
              api.request[item].map((conf) => {
                if (!(conf.key in req[emumReqRes[item]])) {
                  errorDetails.push({
                    key: conf.key,
                    details: `required ${item}.`,
                  });
                }
                return conf;
              });
            }
          });

          if (errorDetails.length !== 0) {
            // response error
            this.resError(res, errorDetails);
          } else {
            // response success
            this.resSuccess(res, api);
          }
        }, parseInt(api.latency, 10));
      });
    });
  }

  /**
    * return successful response
    *
    * @params { res }
    * @desc service response
    *
    * @params { api }
    * @desc api info
    *
    */
  static resSuccess(res, api) {
    // return status
    res.status(api.resCode.slice(0, 3));

    // set headers
    if (api.response.headers.length > 0) {
      api.response.headers.forEach((header) => {
        if (header.required) {
          res.set(header.key, header.value);
        }
      });
    }

    // set cookies
    if (api.response.cookies.length > 0) {
      api.response.cookies.forEach((cookie) => {
        if (cookie.required) {
          res.cookie(cookie.key, cookie.value);
        }
      });
    }

    // return json data
    res.json(JSON.parse(api.response.body.value));
  }

  /**
    * return error response
    *
    * @params { res }
    * @desc service response
    *
    * @params { type }
    * @desc error type
    *
    */
  static resError(res, errors) {
    // return status
    res.status(400);

    // return error details
    res.json({
      errors,
    });

    // end the reponse process
    res.end();
  }
}
