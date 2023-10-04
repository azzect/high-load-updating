const { startServer, createServer } = require("./core/server");
const { createExpressApp } = require("./core/expressApp");
const { addController } = require("./controllers/balanceController");
const { redisCacheMiddleware } = require("./middlewares/redisCacheMiddleware");
const {
  dbConnectionMiddleware,
} = require("./middlewares/dbConnectionMiddleware");
const { connectToDatabase } = require("./core/database/connectToDatabase");
const { autoLoadingModels } = require("./core/database/autoLoadingModels");
const {
  handleThrowingErrorToResponseMiddleware,
} = require("./middlewares/handleThrowingErrorToResponseMiddleware");

const {
  env: { PORT, REDIS_CONNECTION },
} = process;
(async () => {
  const [redisCache, dbConnection] = await Promise.all([
    await redisCacheMiddleware({ url: REDIS_CONNECTION }),
    await dbConnectionMiddleware({
      dataBaseConnection: await autoLoadingModels(await connectToDatabase()),
    }),
  ]);

  startServer({
    server: createServer({
      app: createExpressApp({
        controllers: [addController],
        middlewares: [redisCache, dbConnection],
        postMiddlewares: [handleThrowingErrorToResponseMiddleware],
      }),
    }),
    port: PORT,
  });
})();
