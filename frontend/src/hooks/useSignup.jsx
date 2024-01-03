import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const useSignup = () => {
  const { authAxios, dispatch } = useAuthContext();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signup = async (fName, lName, username, email, password) => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await authAxios.post(
        "/signup",
        {
          fName,
          lName,
          username,
          email,
          password,
        },
        config
      );
      console.log(response);
      const data = await response.data;
      setIsLoading(false);

      console.log(data);
      // TODO: dispatch({type: "LOGIN", payload: json})
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

  return { signup, isLoading, error };
};
