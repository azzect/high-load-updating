class UserNotExists extends Error {
  constructor() {
    super(`User not exists`);
  }
}

module.exports = {
  UserNotExists,
};
