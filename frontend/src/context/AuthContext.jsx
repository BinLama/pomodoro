import { createContext, useEffect, useReducer } from "react";
import { INITIAL_AUTH_STATE, authReducer } from "../reducers/authReducers";
import axios from "axios";
import { auth } from "../utils/constants";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_AUTH_STATE);

  useEffect(() => {
    // checking the authentication of the token
    // should resign the token if the user is the correct one
    checkAuthentication();
  }, []);

  const authAxios = axios.create({
    baseURL: "http://localhost:5000/api/v1/auth",
  });

  const checkAuthentication = async () => {
    try {
      const response = await authAxios.get("/check_auth", {
        withCredentials: true,
        credentials: "include",
      });

      if (response.status === 200) {
        const data = await response.data;
        dispatch({ type: auth.LOGIN, payload: data.username });
      }
    } catch (err) {
      if (err.response) {
        // server responded with status other than 200 range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);

        if (err.response.status === 404) {
          alert("Error: Page not found");
        }
      } else if (err.request) {
        // request was made but no response
        console.error(err.request);
      } else {
        console.error(err.message);
      }
    }
  };

  console.log("AuthContext state: ", state);
  return (
    <AuthContext.Provider value={{ ...state, authAxios, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
