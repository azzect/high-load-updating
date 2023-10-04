const { BadRequest } = require("http-errors");

const { getValueByPath } = require("../utils/getValueByPath");

const validValueIsNumberGuard = (pathToFiled) => (req, res, next) => {
  if (!Number.isFinite(Number.parseFloat(getValueByPath(req, pathToFiled)))) {
    throw new BadRequest(
      `Invalid value for ${pathToFiled}. ${pathToFiled} is not number`,
    );
  }

  next();
};

module.exports = {
  validValueIsNumberGuard,
};
