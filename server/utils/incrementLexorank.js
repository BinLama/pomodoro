const incrementLexorank = (lexorank) => {
  const lastChar = lexorank.slice(-1);
  const remaining = lexorank.slice(0, -1);

  if (lastChar < "z") {
    return remaining + String.fromCharCode(lastChar.charCodeAt(0) + 1);
  }

  return incrementLexorank(remaining) + "a";
};

module.exports = { incrementLexorank };
