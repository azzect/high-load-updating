const { BadRequest } = require("http-errors");

const { isUUIDv4 } = require("../utils/isUUIDv4");
const { getValueByPath } = require("../utils/getValueByPath");

const validUUIDv4Guard = (pathToFiled) => (req, res, next) => {
  if (!isUUIDv4(getValueByPath(req, pathToFiled))) {
    throw new BadRequest(
      `Invalid value for ${pathToFiled}. ${pathToFiled} is not UUIDv4`,
    );
  }

  next();
};

module.exports = {
  validUUIDv4Guard,
};
