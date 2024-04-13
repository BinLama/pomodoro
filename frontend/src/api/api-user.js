import axios from "axios";

const userAxios = axios.create({
  baseURL: "http://localhost:5000/api/v1/user",
});

/**
 * used to get user information after they have already signed in
 *
 * @param {AbortSignal} signal to abort the request.
 *
 * @return {Promise} user data with their id, email, username, first and last name.
 */
const getUserAuth = async (signal) => {
  try {
    const response = await userAxios.get(`/`, {
      withCredentials: true,
      credentials: "include",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = await response.data;
      return data;
    }
  } catch (err) {
    if (err.response) {
      return err.response;
    } else if (err.request) {
      // request was made but no response
      console.error(err.request);
      return err.response;
    } else {
      console.error(err.message);
      return err.message;
    }
  }
};

/**
 * used to get user information after they have already signed in
 *
 * @param {AbortSignal} signal to abort the request.
 *
 * @return {Promise} user data with their id, email, username, first and last name.
 */
const getAllUsers = async (signal) => {
  try {
    const response = await userAxios.get(`/list`, {
      withCredentials: true,
      credentials: "include",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = await response.data;
      return data;
    }
  } catch (err) {
    if (err.response) {
      return err.response;
    } else if (err.request) {
      // request was made but no response
      console.error(err.request);
      return err.response;
    } else {
      console.error(err.message);
      return err.message;
    }
  }
};

/**
 * used to get user information after they have already signed in
 * @param {object} param parameter with userId.
 * @param {AbortSignal} signal to abort the request.
 *
 * @return {Promise} user data with their id, email, username, first and last name.
 */
const getSingleUser = async (param, signal) => {
  try {
    const response = await userAxios.get(`/${param.userId}`, {
      withCredentials: true,
      credentials: "include",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = await response.data;
      return data;
    }
  } catch (err) {
    if (err.response) {
      return err.response;
    } else if (err.request) {
      // request was made but no response
      console.error(err.request);
      return err.response;
    } else {
      console.error(err.message);
      return err.message;
    }
  }
};

/**
 * update single user
 * @param {object} param parameter with userId.
 * @param {object} user to abort the request.
 *
 * @return {Promise} user data with their id, email, username, first and last name.
 */
const updateSingleUser = async (param, user) => {
  try {
    const response = await userAxios.patch(
      `/${param.userId}`,
      { ...user },
      {
        withCredentials: true,
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (response.status === 200) {
      const data = await response.data;
      return data;
    }
  } catch (err) {
    if (err.response) {
      return err.response;
    } else if (err.request) {
      // request was made but no response
      console.error(err.request);
      return err.response;
    } else {
      console.error(err.message);
      return err.message;
    }
  }
};

export { getUserAuth, getAllUsers, getSingleUser, updateSingleUser };
