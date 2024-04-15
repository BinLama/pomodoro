import axios from "axios";

const taskAxios = axios.create({
  baseURL: "http://localhost:5000/api/v1/task",
});

/**
 * get all the task that use
 *
 * @param {AbortSignal} signal to abort the request.
 *
 * @return {Promise} user data with their id, email, username, first and last name.
 */
const getAllTasks = async (signal) => {
  try {
    const response = await taskAxios.get(`/`, {
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

const createSingleTask = async (task) => {
  try {
    const response = await taskAxios.post(
      "/",
      { ...task },
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
      return err.response;
    } else if (err.request) {
      console.error(err.request);
      return err.response;
    } else {
      console.error(err.message);
      return err.message;
    }
  }
};

const updateSingleTask = async () => {};

export { getAllTasks, createSingleTask, updateSingleTask };
