import axios from "axios";

const settingAxios = axios.create({
  baseURL: "http://localhost:5000/api/v1/setting",
});

/**
 * used to get user setting
 *
 * @param {AbortSignal} signal to abort the request.
 *
 * @return {Promise} setting data for that user id
 */
const getSetting = async (signal) => {
  try {
    const response = await settingAxios.get("/", {
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
 * updates the timer setting
 *
 * @param {object} param - takes in setting id
 * @param {object} setting - the setting that is being changed
 * @param {AbortController} signal - abort controller
 */

const updateSetting = async (param, setting) => {
  try {
    const response = await settingAxios.patch(
      `/${param.settingId}`,
      { ...setting },
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
    } else if (err.request) {
      // request was made but no response
      console.error(err.request);
    } else {
      console.error(err.message);
    }
  }
};

export { getSetting, updateSetting };
