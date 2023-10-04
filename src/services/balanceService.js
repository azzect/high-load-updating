const { UserNotExists } = require("../utils/errors/UserNotExists");
const {
  UserHasntEnoughBalance,
} = require("../utils/errors/UserHasntEnoughBalance");
const { getValueFromCache, updateValueToCache } = require("./cacheService");

const createCacheKeyForBalance = (userId) => `user:${userId}:balance`;

const getCurrentUserBalance = ({ userId, dbConnection }) =>
  dbConnection.models.User.findOne({
    where: { id: userId },
  }).then((user) => {
    if (user) {
      return user.toJSON();
    }
    throw new UserNotExists();
  });

const changeUserBalance = async ({
  userId,
  amount,
  cacheClient,
  dbConnection,
}) => {
  const cacheKey = createCacheKeyForBalance(userId);
  const balance = await getValueFromCache({
    cacheClient,
    key: cacheKey,
    defaultValueClb: async () => {
      const { balance: balanceFromBase } = await getCurrentUserBalance({
        userId,
        dbConnection,
      });

      return balanceFromBase;
    },
  });

  if (balance <= 0 && amount < 0) {
    throw new UserHasntEnoughBalance();
  }

  const { balance: newBalance } = (
    await dbConnection.models.User.incrementBalance({
      userId,
      amount,
    })
  ).toJSON();

  updateValueToCache({ key: cacheKey, value: newBalance, cacheClient });

  return newBalance;
};

module.exports = { changeUserBalance };
