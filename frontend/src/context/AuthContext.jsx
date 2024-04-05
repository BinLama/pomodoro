import { createContext, useEffect, useReducer } from "react";
import { INITIAL_AUTH_STATE, authReducer } from "../reducers/authReducers";
import { authAxios, checkAuthentication } from "../api/api-auth";
import { auth } from "../utils/constants";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_AUTH_STATE);

  useEffect(() => {
    // checking the authentication of the token
    // should resign the token if the user is the correct one
    const data = checkAuthentication();
    console.log(data);
    dispatch({ type: auth.LOGIN, payload: data });
  }, []);

  console.log("AuthContext state: ", state);
  return (
    <AuthContext.Provider value={{ ...state, authAxios, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
