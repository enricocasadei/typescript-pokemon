/* craco.config.js */
const fs = require("fs");

module.exports = {
  devServer: {
    https: true,
    port: 9000,
    disableHostCheck: true,
    key: fs.readFileSync("localhost-key.pem"),
    cert: fs.readFileSync("localhost.pem"),
  },
};
