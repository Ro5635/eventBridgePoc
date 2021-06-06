/**
 * Utility function to remove undefined's from an object
 *
 * Input: {forename: undefined, surname: 'bond', age: undefined, cakes: 33}
 * result: {surname: 'bond', cakes: 33}
 */

const removeUndefinedKeys = (obj) => {
  const cleanObj = {};

  Object.keys(obj).forEach((key) => {
    if (obj[key] !== undefined) {
      cleanObj[key] = obj[key];
    }
  });
  return cleanObj;
};

export default removeUndefinedKeys;
