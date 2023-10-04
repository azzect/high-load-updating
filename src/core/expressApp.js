const express = require("express");

const addingMiddlewares = ({ app, middlewares }) => {
  middlewares.forEach((middleware) => {
    app.use(middleware);
  });
};
const createExpressApp = ({
  controllers = [],
  middlewares = [],
  postMiddlewares = [],
}) => {
  const expressApp = express();

  expressApp.use(express.json());

  addingMiddlewares({ app: expressApp, middlewares });

  controllers.forEach((addController) => addController(expressApp));

  addingMiddlewares({ app: expressApp, middlewares: postMiddlewares });

  return expressApp;
};

module.exports = {
  createExpressApp,
};
