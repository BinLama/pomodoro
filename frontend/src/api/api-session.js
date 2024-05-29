import axios from "axios";

const sessionAxios = axios.create({
  baseURL: "http://localhost:5000/api/v1/session",
});

/**
 * get user sessions
 *
 * @param {AbortSignal} signal to abort the request.
 *
 * @return {Promise} setting data for that user id
 */
const getSessions = async (signal) => {
  try {
    const response = await sessionAxios.get("/", {
      withCredentials: true,
      credentials: "include",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = await response.data;
      return data.setting;
    }
  } catch (err) {
    if (err.response) {
      console.log(err.response);
    } else if (err.request) {
      // request was made but no response
      console.error(err.request);
    } else {
      console.error(err.message);
    }
  }
};

/**
 * create a session
 * only needs userId. It uses default values for the session
 */

const createSession = async () => {
  try {
    const response = await sessionAxios.post(
      "/",
      {},
      {
        withCredentials: true,
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (response.status === 201) {
      const data = await response.data;
      return data;
    }
  } catch (err) {
    if (err.response) {
    } else if (err.request) {
      // request was made but no response
      console.error(err.request);
    } else {
      console.error(err.message);
    }
  }
};

export { getSessions, createSession };
