const isAuthenticated = (id, userId) => {
  console.log(id, userId);
  if (id === userId) {
    return true;
  }
  return false;
};

export { isAuthenticated };
