const express = require('express');
const favicon = require('serve-favicon');

// MIDDLEWARES
const pokemonRouter = require('./src/routes/pokemonRoutes');
const userRouter = require('./src/routes/userRoutes');
const resourceNotFound = require('./src/routes/404');

// DATABASE
const sequelize = require('./src/db/sequelize');
const auth = require('./src/middlewares/authentification/auth');

// ENV VARIABLES
require('dotenv').config();

const app = express();

app
  .use(favicon(__dirname + '/assets/favicon.ico'))
  .use(express.json())
  .all('*', auth)
  .use(process.env.API_URL, pokemonRouter)
  .use(process.env.LOGIN_URL, userRouter)
  .use(resourceNotFound);

sequelize.initDb();

app.listen(process.env.PORT, () => {
  console.log(`server is listening on http://localhost:${process.env.PORT}`);
});
