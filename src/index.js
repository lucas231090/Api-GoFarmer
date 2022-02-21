// yarn dev
const express = require('express');
require('express-async-errors');

const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(routes);
app.use((error, request, response, next) => {
  console.log('#####Error Handler');
  console.log(error);
  response.sendStatus(500);
});

app.listen(3000, () => console.log('Servidor esta rodando no localhost:3000'));
