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

      console.log(response);
      if (response.status === 200) {
        console.log("LOGOUT");
        const data = await response.data;
        setIsLoading(false);

        console.log("Response: ", response);
        console.log("data", data);
        dispatch({ type: auth.LOGOUT });
      }
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        // server responded with status other than 200 range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        setError(err.response.data.error);

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

  return { logout, error, isLoading };
};
