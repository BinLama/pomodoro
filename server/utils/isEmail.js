const validateEmail = (email) => {
  const pattern = new RegExp(
    /^(?=[A-Z0-9@._%+-]{6,254}$)[A-Z0-9._%+-]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,8}[A-Z]{2,63}$/i
  );
  return pattern.test(email);
};

module.exports = { validateEmail };
