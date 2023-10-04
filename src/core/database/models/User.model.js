const {
  UserHasntEnoughBalance,
} = require("../../../utils/errors/UserHasntEnoughBalance");

module.exports = (sequelize, DataTypes) => {
  const UserModel = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.0,
        validate: {
          min: 0,
        },
      },
    },
    {
      tableName: "Users",
    },
  );

  UserModel.incrementBalance = async function ({ userId, amount }) {
    const t = await sequelize.transaction();

    try {
      await sequelize.query(
        `UPDATE "Users" SET "balance" = "balance" + :amount WHERE "id" = :userId`,
        {
          replacements: { userId, amount },
          type: sequelize.QueryTypes.UPDATE,
          transaction: t,
        },
      );

      const user = await UserModel.findByPk(userId, {
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (user.balance < 0) {
        throw new UserHasntEnoughBalance();
      }
      await t.commit();

      return user;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  };

  return UserModel;
};
