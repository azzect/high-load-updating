const { createRedisClient } = require("../core/redisClient");

const createRedisCache = async ({ url }) => {
  const redisClient = await createRedisClient({ url });

  return {
    get: async ({ key }) => {
      const value = redisClient ? await redisClient.get(key) : null;

      return value ? JSON.parse(value) : null;
    },
    set: ({ key, value }) =>
      redisClient
        ? redisClient.set(key, JSON.stringify(value), "EX", 3600)
        : null,
  };
};

const redisCacheMiddleware = async ({ url }) => {
  const cacheClient = await createRedisCache({ url });
  return (req, res, next) => {
    req.cacheClient = cacheClient;
    next();
  };
};

module.exports = {
  redisCacheMiddleware,
};
