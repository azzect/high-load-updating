const { DataTypes } = require("sequelize");
const UserModel = require("../models/User.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const model = UserModel(queryInterface.sequelize, DataTypes);

    await model.create({
      balance: 10000,
    });
  },
};
