const dbConnectionMiddleware =
  ({ dataBaseConnection }) =>
    (req, res, next) => {
      req.dbConnection = dataBaseConnection;
      next();
    };

module.exports = {
  dbConnectionMiddleware,
};
