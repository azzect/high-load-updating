const updateValueToCache = async ({
  cacheClient,
  key,
  value,
  mapForSaving,
}) => {
  cacheClient.set({ key, value: mapForSaving ? mapForSaving(value) : value });
};

const getValueFromCache = async ({ cacheClient, key, defaultValueClb }) => {
  const valueFromCache = await cacheClient.get({ key });

  if (valueFromCache !== null) {
    return valueFromCache;
  }

  const firstValue = await defaultValueClb();

  updateValueToCache({ key, value: firstValue, cacheClient });

  return firstValue;
};

module.exports = {
  getValueFromCache,
  updateValueToCache,
};
