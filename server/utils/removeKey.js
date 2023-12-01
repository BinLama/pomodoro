const removeKeyEndsWith = (obj, letter) => {
  Object.keys(obj).forEach((key) => {
    if (key.match(letter + "$")) delete obj[key];
  });
};

module.exports = { removeKeyEndsWith };
