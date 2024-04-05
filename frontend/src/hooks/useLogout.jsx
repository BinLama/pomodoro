import { useState } from "react";
import { auth } from "../utils/constants";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch, authAxios } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const logout = async () => {
    try {
      const response = await authAxios.post(
        "/logout",
        {},
        {
          withCredentials: true,
          credentials: "include",
        }
      );

      if (response.status === 200) {
        setIsLoading(false);
        dispatch({ type: auth.LOGOUT });
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

  return { logout, error, isLoading };
};
