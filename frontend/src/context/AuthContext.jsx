import { createContext, useReducer } from "react";
import { INITIAL_AUTH_STATE, authReducer } from "../reducers/authReducers";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_AUTH_STATE);

  const authAxios = axios.create({
    baseURL: "http://localhost:5000/api/v1",
  });

  console.log("AuthContext state: ", state);
  return (
    <AuthContext.Provider value={{ ...state, authAxios, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
