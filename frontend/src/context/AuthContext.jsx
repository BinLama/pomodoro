import { createContext, useReducer } from "react";
import { INITIAL_AUTH_STATE, authReducer } from "../reducers/authReducers";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_AUTH_STATE);

  console.log("AuthContext state: ", state);
  return (
    <AuthContext.Provider value={{ ...state }}>{children}</AuthContext.Provider>
  );
};
