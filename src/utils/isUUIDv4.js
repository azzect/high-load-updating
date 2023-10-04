const pattern = /^[a-fA-F\d]{8}(?:-[a-fA-F\d]{4}){3}-[a-fA-F\d]{12}$/;
const isUUIDv4 = (value) => pattern.test(value);

module.exports = {
  isUUIDv4,
};
