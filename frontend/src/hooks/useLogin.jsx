import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { auth } from "../utils/constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  credentials: "include",
};

export const useLogin = () => {
  const { authAxios, dispatch } = useAuthContext();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const login = async (usernameOrEmail, password) => {
    setIsLoading(true);
    setError(false);

    try {
      const response = await authAxios.post(
        "/login",
        {
          usernameOrEmail,
          password,
        },
        config
      );

      if (response.status === 200) {
        console.log("LOGIN");
        const data = await response.data;
        setIsLoading(false);

        console.log("Response: ", response);
        console.log("data", data.user);

        dispatch({ type: auth.LOGIN, payload: data.user });
      }
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        // server responded with status other than 200 range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        setError(err.response.data.error);

        console.log(err.response.data.error);
      } else if (err.request) {
        // request was made but no response
        console.error(err.request);
      } else {
        console.error(err.message);
      }
    }
  };

  return { login, isLoading, error };
};
