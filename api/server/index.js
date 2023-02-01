const express = require("express");

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Rodando em http://localhost:${port}`);
});

module.exports = app;
