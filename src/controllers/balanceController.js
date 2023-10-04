const { NotFound, InternalServerError, BadRequest } = require("http-errors");

const { validUUIDv4Guard } = require("../middlewares/validUUIDv4Guard");
const {
  validValueIsNumberGuard,
} = require("../middlewares/validValueIsNumberGuard");
const { changeUserBalance } = require("../services/balanceService");
const { UserNotExists } = require("../utils/errors/UserNotExists");
const {
  UserHasntEnoughBalance,
} = require("../utils/errors/UserHasntEnoughBalance");

const BASE_CONTROLLER_URL = "/balance";
const changeUserBalanceController = async (req, res, next) => {
  const {
    params: { userId },
    body: { amount },
    cacheClient,
    dbConnection,
  } = req;

  try {
    await changeUserBalance({
      userId,
      amount,
      cacheClient,
      dbConnection,
    });

    res.sendStatus(201);
  } catch (e) {
    if (e instanceof UserNotExists) {
      next(new NotFound(`User with userId ${userId} doesn't exists`));
    }
    if (e instanceof UserHasntEnoughBalance) {
      next(new BadRequest(`User hasn't enough balance for operation`));
    }

    next(e);
  }
};

const addController = (app) => {
  app.put(
    `${BASE_CONTROLLER_URL}/user/:userId`,
    validValueIsNumberGuard("body.amount"),
    validUUIDv4Guard("params.userId"),
    changeUserBalanceController,
  );
};

module.exports = {
  addController,
};
