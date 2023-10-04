const { Sequelize } = require("sequelize");

const {
  env: { DB_LOGGING, NODE_ENV = "development" },
} = process;

const config = require(`${__dirname}/config/config.js`)[NODE_ENV];

const connectToDatabase = async () => {
  try {
    const sequelize = new Sequelize({
      ...config,
      logging: DB_LOGGING === "true",
    });

    console.log("Connection has been established successfully.");

    return sequelize;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return null;
  }
};

module.exports = {
  connectToDatabase,
};
