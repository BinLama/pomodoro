const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const removeKeyEndsWith = (obj, letter) => {
  if (letter === "") return;
  const escapedCharacters = escapeRegExp(letter);
  const pattern = new RegExp(escapedCharacters + "$");

  Object.keys(obj).forEach((key) => {
    if (key.match(pattern)) delete obj[key];
  });
};

module.exports = { escapeRegExp, removeKeyEndsWith };
