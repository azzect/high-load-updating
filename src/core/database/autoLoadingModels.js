const fs = require("fs");
const path = require("path");
const { DataTypes } = require("sequelize");

const modelFolder = `${__dirname}/models`;
const autoLoadingModels = async (sequelize) => {
  fs.readdirSync(modelFolder)
    .filter((file) => file.endsWith("model.js"))
    .forEach((file) => {
      const modelPath = path.join(modelFolder, file);
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const model = require(modelPath);
      model(sequelize, DataTypes);
    });

  await sequelize.sync();

  return sequelize;
};

module.exports = {
  autoLoadingModels,
};
