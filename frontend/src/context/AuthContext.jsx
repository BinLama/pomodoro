import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

import { INITIAL_AUTH_STATE, authReducer } from "../reducers/authReducers";
import { auth } from "../utils/constants";
import { getUserAuth } from "../api/api-user";

export const AuthContext = createContext();

const authAxios = axios.create({
  baseURL: "http://localhost:5000/api/v1/auth",
});

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_AUTH_STATE);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    // checking the authentication of the token
    // should resign the token if the user is the correct one
    const authCheck = async () => {
      const data = await getUserAuth(signal);
      if (data) {
        dispatch({ type: auth.LOGIN, payload: data.user });
      }
    };

    authCheck();

    return () => {
      abortController.abort();
    };
  }, []);

  console.log("AuthContext state: ", state);
  return (
    <AuthContext.Provider value={{ ...state, authAxios, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
