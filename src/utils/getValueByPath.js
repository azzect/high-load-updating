const getValueByPath = (obj, path) => {
  const parts = path.split(".");
  let current = obj;

  for (let i = 0; i < parts.length; i++) {
    if (current[parts[i]] === undefined) {
      return undefined;
    }
    current = current[parts[i]];
  }

  return current;
};

module.exports = {
  getValueByPath,
};
