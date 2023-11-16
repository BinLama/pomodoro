export const useLocalStorage = (key) => {
  const setItem = (value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = () => {
    try {
      const savedValue = localStorage.getItem(key);
      return savedValue ? JSON.parse(savedValue) : undefined;
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = () => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };
  return { setItem, getItem, removeItem };
};
