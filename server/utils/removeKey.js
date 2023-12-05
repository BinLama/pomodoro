/**
 * escape regular expression patterns
 * @param {string} string - regular string with some values that are used in regular expression
 * @returns {string} new string - string that has all the regular expression key values escaped.
 */
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

/**
 * remove keys that ends with the letter provided
 * @param {object} obj - object with key and value pairs
 * @param {string} letter - word or sequence of word to be removed.
 * @return changes are made using reference of the previous object so nothing is returned
 */
const removeKeyEndsWith = (obj, letter) => {
  if (letter === "") return;
  const escapedCharacters = escapeRegExp(letter);
  const pattern = new RegExp(escapedCharacters + "$");

  Object.keys(obj).forEach((key) => {
    if (key.match(pattern)) delete obj[key];
  });
};

module.exports = { escapeRegExp, removeKeyEndsWith };
