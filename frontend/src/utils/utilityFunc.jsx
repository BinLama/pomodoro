import { useAuthContext } from "../hooks/useAuthContext";

export const mergeArrays = (arr1, arr2) => {
  return arr1.reduce((acc, b) => {
    const idx = acc.findIndex((item) => item.id === b.id); //look for the acc has the same id while iterating array1
    if (idx > -1) {
      // if found need to merge with value of array2
      acc[idx] = Object.assign(b, acc[idx]);
      return acc;
    }
    return [...acc, b]; //if we don't find anything so "b" is an unique entry
  }, arr2); //inital values of reduce is from array2
};
