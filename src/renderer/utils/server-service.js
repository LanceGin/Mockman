// server method with dynamic configuration
const express = require('express')

const listenPort = (service, port) => {
  service.listen(port, (err, res) => {
    console.log("err:", err, "res:", res);
  });
};

export const start = (config) => {
  const service = express();
  const port = config.port;

  listenPort(service, port);
}
