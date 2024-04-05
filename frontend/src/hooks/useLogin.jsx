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
        const data = await response.data;
        setIsLoading(false);
        dispatch({ type: auth.LOGIN, payload: data.user });
      }
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        setError(err.response.data.error);
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
