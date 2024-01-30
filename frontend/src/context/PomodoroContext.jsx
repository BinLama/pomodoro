import { createContext, useEffect, useReducer, useState } from "react";
import { customFocusLevel, sounds } from "../data";
import { CUSTOM, pomodoroReducerActions } from "../utils/constants";
import {
  INITIAL_POMODORO_STATE,
  pomodoroReducer,
} from "../reducers/pomodoroReducer";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAuthContext } from "../hooks/useAuthContext";

// for setting up patch request from setting
const settingPatchRequest = async (pomoAxios, data, _id) => {
  console.log("GOT TO SETTING PATCH");
  try {
    const response = await pomoAxios.patch(`/setting/${_id}`, data, {
      withCredentials: true,
      credentials: "include",
    });

    if (response.status === 200) {
      const data = await response.data;
      console.log("POMODORO UPDATE: ", data);
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

/**
 * creating react context
 */
export const PomodoroContext = createContext();

/**
 * setting up react provider
 *
 * @param {props} children
 */
export const PomodoroContextProvider = ({ children }) => {
  // localstorage for setting state
  const { setItem, getItem } = useLocalStorage("pomodoroContext");

  // localstorage for custom slider
  const { setItem: setSlider, getItem: getSlider } =
    useLocalStorage("customSlider");

  // check if user is logged in
  const { user, authAxios: pomoAxios } = useAuthContext();

  const initialData = getItem() || INITIAL_POMODORO_STATE;

  const [state, dispatch] = useReducer(pomodoroReducer, initialData);

  // need to set up initial value to not get uncontrolled error
  const [sliderData, setSliderData] = useState(
    getSlider() || {
      pomodoro: customFocusLevel.choices[5].slider[0].value,
      shortBreak: customFocusLevel.choices[5].slider[1].value,
      longBreak: customFocusLevel.choices[5].slider[2].value,
    }
  );

  /**
   * Getting all the setting data when the user log's in
   * or when the window loads
   */
  useEffect(() => {
    const getAllData = async () => {
      if (!user) {
        /**
         * Get setting avlue from the local storage if available
         */
        const value = getItem();
        /**
         * call this dispatch because audio is object and I need to make it into a audio file.
         *
         */
        if (value) {
          dispatch({
            type: pomodoroReducerActions.GET_USER_POMO_DATA,
            payload: value,
          });
        }
      } else {
        /**
         * user has logged in so have access to user
         * access the user's setting
         */
        try {
          const response = await pomoAxios.get("/setting", {
            withCredentials: true,
            credentials: "include",
          });
          if (response.status === 200) {
            const data = await response.data;
            console.log(data);

            const {
              autoBreak,
              autoStudy,
              maxPomodoroSession,
              studyTime,
              relaxTime,
              longRelaxTime,
              longRelaxInterval,
              mute,
              level,
              volume,
              studyStartSound,
              restStartSound,
              id,
            } = data.setting;

            /**
             * Creating new setting and converting audio object
             * to audio files
             */
            const setting = {
              id,
              chosen: {
                data: level,
                newTimer: {
                  pomodoro: studyTime,
                  shortBreak: relaxTime,
                  longBreak: longRelaxTime,
                },
              },
              studyStartSound,
              restStartSound,
              auido: new Audio(sounds[studyStartSound]),
              restAudio: new Audio(sounds[restStartSound]),
              volume,
              mute,
              autoPomo: autoStudy,
              autoBreak: autoBreak,
              longRelaxInterval: longRelaxInterval,
              maxSession: maxPomodoroSession,
              changeToBreak: 0,
              changeToPomo: 0,
              showSetting: false,
              timerActive: false,
            };

            console.log("SETTING: ", setting);
            dispatch({
              type: pomodoroReducerActions.GET_USER_POMO_DATA,
              payload: setting,
            });
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
      }
    };
    console.log("GETCH DATA");
    getAllData();
  }, [user]);

  // Save data to local storage on every dispatch
  useEffect(() => {
    if (!user) {
      // Save updated data to local storage
      setItem(state);
    } else {
      // make a call to the database
    }
  }, [state, user, setItem]);

  // control toggling of setting
  const showOrHideSetting = () => {
    dispatch({ type: pomodoroReducerActions.TOGGLE_SETTING });
  };

  // sets timer to inactive so that I can change the timer even when it's running.
  const notInSession = () => {
    dispatch({ type: pomodoroReducerActions.INACTIVE_SESSION });
  };

  // in the middle of the timer
  const inSession = () => {
    dispatch({ type: pomodoroReducerActions.ACTIVE_SESSION });
  };

  const updateTimer = async (type, pomodoro, shortBreak, longBreak) => {
    // stop the same update when it's already selected
    if (
      (type === state.chosen.data && type !== CUSTOM) ||
      (type === CUSTOM &&
        state.chosen.newTimer.pomodoro === pomodoro &&
        state.chosen.newTimer.shortBreak === shortBreak &&
        state.chosen.newTimer.longBreak === longBreak)
    ) {
      return;
    }
    console.log("Timer:", pomodoro, shortBreak, longBreak);
    let alert;
    if (state.timerActive) {
      alert = window.confirm("Are you sure you want to change the phase?");

      if (!alert) {
        return;
      }
      notInSession();
    }

    dispatch({
      type: pomodoroReducerActions.UPDATE_TIMER,
      payload: {
        data: type,
        newTimer: {
          ...state.newTimer,
          pomodoro,
          shortBreak: shortBreak,
          longBreak,
        },
      },
    });

    if (user) {
      const newData = {
        level: type,
        studyTime: pomodoro,
        relaxTime: shortBreak,
        longRelaxTime: longBreak,
      };
      await settingPatchRequest(pomoAxios, newData, state.id);
    }

    console.log("Timer updated");
  };

  /**
   * play timer ending audio
   *
   */
  const playAudio = (music, pomo = false) => {
    if (state.mute && pomo) return;
    console.log("Play music");
    const newMusic = sounds[music];
    if (state.audio) {
      console.log("AUDIO PAUSE: ", state.audio);
      state.audio.pause();
    }

    if (music !== state.studyStartSound) {
      const newAudio = new Audio(newMusic);
      newAudio.preload = "auto";
      newAudio.volume = state.volume / 100;
      newAudio.play().catch((e) => {
        console.log("New audio play error");
      });

      dispatch({
        type: pomodoroReducerActions.PLAY_AUDIO,
        payload: { audio: newAudio, music: music },
      });
      return;
    }

    state.audio.play().catch((e) => {
      console.log("old audio play error");
    });
  };

  const handleVolumeChange = async (loudness) => {
    console.log("AUDIO:", state.audio);
    state.audio.volume = loudness / 100;
    dispatch({ type: pomodoroReducerActions.CHANGE_VOLUME, payload: loudness });
    if (user) {
      const newData = { volume: loudness };
      await settingPatchRequest(newData, state.id);
    }
  };

  const changeMusic = async (music) => {
    dispatch({ type: pomodoroReducerActions.CHANGE_MUSIC, payload: music });
    playAudio(music);
    if (user) {
      const newData = {
        mute: false,
        studyStartSound: music,
      };

      await settingPatchRequest(pomoAxios, newData, state.id);
    }
  };

  const toggleMute = async () => {
    dispatch({ type: pomodoroReducerActions.TOGGLE_MUTE });
    if (user) {
      const newData = {
        mute: !state.mute,
      };
      await settingPatchRequest(pomoAxios, newData, state.id);
    }
  };

  const toggleBreak = async () => {
    dispatch({ type: pomodoroReducerActions.TOGGLE_autoBreak });
    if (user) {
      const newData = {
        autoBreak: !state.autoBreak,
      };
      await settingPatchRequest(pomoAxios, newData, state.id);
      // Now, update the local state with the response from the server
      try {
        const response = await pomoAxios.get(`/setting`, {
          withCredentials: true,
          credentials: "include",
        });

        if (response.status === 200) {
          const data = await response.data;

          // Extract the necessary values from the response
          const { autoBreak } = data.setting;

          // Update the local state with the new values
          dispatch({
            type: pomodoroReducerActions.TOGGLE_autoBreak_SUCCESS,
            payload: { autoBreak: autoBreak },
          });
        }
      } catch (err) {
        // Handle errors
        console.error("Error updating state after togglePomo:", err);
      }
    }
  };

  const togglePomo = async () => {
    console.log("TOGGLE POMO");
    dispatch({ type: pomodoroReducerActions.TOGGLE_AUTO_POMO });
    if (user) {
      const newData = {
        autoStudy: !state.autoPomo,
      };
      await settingPatchRequest(pomoAxios, newData, state.id);

      // Now, update the local state with the response from the server
      try {
        const response = await pomoAxios.get(`/setting`, {
          withCredentials: true,
          credentials: "include",
        });

        if (response.status === 200) {
          const data = await response.data;

          // Extract the necessary values from the response
          const { autoStudy } = data.setting;

          // Update the local state with the new values
          dispatch({
            type: pomodoroReducerActions.TOGGLE_AUTO_POMO_SUCCESS,
            payload: { autoPomo: autoStudy },
          });
        }
      } catch (err) {
        // Handle errors
        console.error("Error updating state after togglePomo:", err);
      }
    }
  };

  const skipToBreak = () => {
    dispatch({ type: pomodoroReducerActions.SKIP_TO_BREAK });
  };

  const skipToPomo = () => {
    dispatch({ type: pomodoroReducerActions.SKIP_TO_POMO });
  };

  // console.log("Pomodoro Context state:", state);
  return (
    <PomodoroContext.Provider
      value={{
        ...state,
        updateTimer,
        playAudio,
        handleVolumeChange,
        changeMusic,
        toggleMute,
        togglePomo,
        toggleBreak,
        showOrHideSetting,
        skipToBreak,
        skipToPomo,
        notInSession,
        inSession,
        sliderData,
        setSliderData,
        setSlider,
        getSlider,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};
