const { createClient } = require("redis");

const createRedisClient = async ({ url }) =>
  createClient({ url })
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

module.exports = {
  createRedisClient,
};
