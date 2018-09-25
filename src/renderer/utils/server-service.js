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
}

export default const start = (config) => {
  const service = express();
  const port = config.port;

  listenPort(service, port);
  setCors(service);
}
