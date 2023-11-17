import { createContext, useEffect, useReducer } from "react";
import { sounds } from "../data";
import { CUSTOM, pomodoroReducerActions } from "../utils/constants";
import {
  INITIAL_POMODORO_STATE,
  pomodoroReducer,
} from "../reducers/PomodoroReducer";
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
// creating context
export const PomodoroContext = createContext();

// creating provider
export const PomodoroContextProvider = ({ children }) => {
  // provider start
  const { user, authAxios: pomoAxios } = useAuthContext();
  const { setItem, getItem } = useLocalStorage("pomodoroContext");

  // setting the initial value
  const initialData = getItem() || INITIAL_POMODORO_STATE;
  const [state, dispatch] = useReducer(pomodoroReducer, initialData);

  useEffect(() => {
    const getAllData = async () => {
      if (!user) {
        // call this dispatch because audio is object and I need to make it into a audio file.
        const value = getItem();
        if (value) {
          dispatch({
            type: pomodoroReducerActions.GET_USER_POMO_DATA,
            payload: value,
          });
        }
      } else {
        try {
          const response = await pomoAxios.get("/setting", {
            withCredentials: true,
            credentials: "include",
          });
          if (response.status === 200) {
            const data = await response.data;
            console.log(data);

            const {
              auto_break,
              auto_study,
              max_pomodoro_session,
              study_time,
              relax_time,
              long_relax_time,
              long_relax_interval,
              mute,
              level,
              volume,
              study_start_sound,
              rest_start_sound,
              id,
            } = data.setting;

            const setting = {
              id,
              chosen: {
                data: level,
                newTimer: {
                  pomodoro: study_time,
                  break: relax_time,
                  longBreak: long_relax_time,
                },
              },
              study_start_sound,
              rest_start_sound,
              auido: new Audio(sounds[study_start_sound]),
              restAudio: new Audio(sounds[rest_start_sound]),
              volume,
              mute,
              autoPomo: auto_study,
              autoBreak: auto_break,
              longRelaxInterval: long_relax_interval,
              maxSession: max_pomodoro_session,
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
        state.chosen.newTimer.break === shortBreak &&
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
          break: shortBreak,
          longBreak,
        },
      },
    });

    if (user) {
      const newData = {
        level: type,
        study_time: pomodoro,
        relax_time: shortBreak,
        long_relax_time: longBreak,
      };
      await settingPatchRequest(pomoAxios, newData, state.id);
    }

    console.log("Timer updated");
  };

  const playAudio = (music, pomo = false) => {
    if (state.mute && pomo) return;
    console.log("Play music");
    const newMusic = sounds[music];
    if (state.audio) {
      console.log("AUDIO PAUSE: ", state.audio);
      state.audio.pause();
    }

    if (music !== state.study_start_sound) {
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
        study_start_sound: music,
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
    dispatch({ type: pomodoroReducerActions.TOGGLE_AUTO_BREAK });
    if (user) {
      const newData = {
        auto_break: !state.autoBreak,
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
          const { auto_break } = data.setting;

          // Update the local state with the new values
          dispatch({
            type: pomodoroReducerActions.TOGGLE_AUTO_BREAK_SUCCESS,
            payload: { autoBreak: auto_break },
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
        auto_study: !state.autoPomo,
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
          const { auto_study } = data.setting;

          // Update the local state with the new values
          dispatch({
            type: pomodoroReducerActions.TOGGLE_AUTO_POMO_SUCCESS,
            payload: { autoPomo: auto_study },
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

  console.log("Pomodoro Context state:", state);
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
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};
