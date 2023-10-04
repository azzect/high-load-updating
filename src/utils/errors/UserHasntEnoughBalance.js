class UserHasntEnoughBalance extends Error {
  constructor() {
    super(`User hasn't enough balance for operation`);
  }
}

module.exports = {
  UserHasntEnoughBalance,
};
