const bodyParser = require("body-parser");
const users = require("./userRoutes");

module.exports = (app) => {
  app.use(bodyParser.json(), users);
};
