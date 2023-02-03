const express = require("express");
const routes = require("../routes");

const app = express();
const port = 2000;
routes(app);

app.listen(port, () => {
  console.log(`Rodando em http://localhost:${port}`);
});

module.exports = app;
