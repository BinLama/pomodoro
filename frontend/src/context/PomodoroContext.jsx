import { createContext, useEffect, useReducer, useState } from "react";
import { customFocusLevel, sounds } from "../data";
import { CUSTOM, pomodoroReducerActions } from "../utils/constants";
import {
  INITIAL_POMODORO_STATE,
  pomodoroReducer,
} from "../reducers/pomodoroReducer";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAuthContext } from "../hooks/useAuthContext";
import { getSetting, updateSetting } from "../api/api-setting";

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

  // check if user is logged in
  const { username } = useAuthContext();

  const initialData = getItem() || INITIAL_POMODORO_STATE;

  const [state, dispatch] = useReducer(pomodoroReducer, initialData);

  /**
   * Getting all the setting data when the user log's in
   * or when the window loads
   */
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const getAllData = async () => {
      if (!username) {
        const value = getItem();
        /**
         * call this dispatch because audio is object and I need to make it into a audio file.
         */
        if (value) {
          return dispatch({
            type: pomodoroReducerActions.GET_USER_POMO_DATA,
            payload: value,
          });
        }
      }

      if (username) {
        console.log("got to user setting");
        const settingData = await getSetting(signal);

        if (settingData) {
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
            customStudyTime,
            customRelaxTime,
            customLongRelaxTime,
          } = settingData;

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
            sliderData: {
              customStudyTime,
              customRelaxTime,
              customLongRelaxTime,
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

          dispatch({
            type: pomodoroReducerActions.GET_USER_POMO_DATA,
            payload: setting,
          });
          return;
        }
      }
    };
    getAllData();

    return () => {
      abortController.abort();
    };
  }, [username]);

  // Save data to local storage on every dispatch
  useEffect(() => {
    if (!username) {
      console.log("saving state to local storage");
      // Save updated data to local storage
      setItem(state);
    }
  }, [state, username]);

  // toggling of login profile setting
  const setToggleLogin = () => {
    dispatch({ type: pomodoroReducerActions.TOGGLE_LOGIN });
  };

  // control toggling of setting
  const setShowOrHideSetting = () => {
    console.log("show or hide setting");
    dispatch({ type: pomodoroReducerActions.TOGGLE_SETTING });
  };

  // hide setting
  const setHideSetting = () => {
    console.log("hide setting dispatch");
    dispatch({ type: pomodoroReducerActions.HIDE_SETTING });
  };

  const setShowSetting = () => {
    dispatch({ type: pomodoroReducerActions.SHOW_SETTING });
  };

  // sets timer to inactive so that I can change the timer even when it's running.
  const setNotInSession = () => {
    dispatch({ type: pomodoroReducerActions.INACTIVE_SESSION });
  };

  // in the middle of the timer
  const inSession = () => {
    dispatch({ type: pomodoroReducerActions.ACTIVE_SESSION });
  };

  /**
   * changing timer to new states
   *
   * @param {string} type level that is chosen for pomodoro
   * @param {number} pomodoro min to be spent on pomodoro
   * @param {number} shortBreak min to be spent on break
   * @param {number} longBreak min to be spent on longBreak
   *
   */
  const updateTimer = async (type, pomodoro, shortBreak, longBreak) => {
    console.log(type, pomodoro, shortBreak, longBreak);
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
      setNotInSession();
    }

    // I want to do optimistic update
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

    if (username) {
      const newTimer = {
        level: type,
        studyTime: pomodoro,
        relaxTime: shortBreak,
        longRelaxTime: longBreak,
      };

      await updateSetting({ settingId: state.id }, newTimer);
    }

    console.log("Timer updated");
  };

  /**
   * play audio
   * @param {string} music type of sound chosen
   * @param {boolean} playing true for playing audio
   */
  const playAudio = async (music, playing = false) => {
    if (state.mute && playing) return;
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

  /**
   * handles changes in volume
   * @param {number} loudness - volume level from 0 - 100
   */
  const handleVolumeChange = async (loudness) => {
    console.log("AUDIO:", state.audio);
    state.audio.volume = loudness / 100;
    dispatch({ type: pomodoroReducerActions.CHANGE_VOLUME, payload: loudness });
    if (username) {
      const changeVolume = { volume: loudness };
      await updateSetting({ settingId: state.id }, changeVolume);
    }
  };

  /**
   * change music on click, also unmutes the sounds
   * @param {string} music - name of the music
   */
  const changeMusic = async (music) => {
    dispatch({ type: pomodoroReducerActions.CHANGE_MUSIC, payload: music });

    playAudio(music);

    if (username) {
      const changeAudio = {
        studyStartSound: music,
      };

      await updateSetting({ settingId: state.id }, changeAudio);
    }
  };

  /**
   * mutes or unmutes the audio
   */
  const toggleMute = async () => {
    console.log("toggle mute");
    dispatch({ type: pomodoroReducerActions.TOGGLE_MUTE });
    if (username) {
      const changeMute = {
        mute: !state.mute,
      };
      await updateSetting({ settingId: state.id }, changeMute);
    }
  };

  const toggleBreak = async () => {
    console.log("Before", state.autoBreak);
    dispatch({ type: pomodoroReducerActions.TOGGLE_AUTOBREAK });
    console.log("After", state.autoBreak);

    // if (username) {
    //   const newData = {
    //     autoBreak: !state.autoBreak,
    //   };
    //   await settingPatchRequest(pomoAxios, newData, state.id);
    //   // Now, update the local state with the response from the server
    //   try {
    //     const response = await pomoAxios.get(`/setting`, {
    //       withCredentials: true,
    //       credentials: "include",
    //     });

    //     if (response.status === 200) {
    //       const data = await response.data;

    //       // Extract the necessary values from the response
    //       const { autoBreak } = data.setting;

    //       // Update the local state with the new values
    //       dispatch({
    //         type: pomodoroReducerActions.TOGGLE_AUTOBREAK_SUCCESS,
    //         payload: { autoBreak: autoBreak },
    //       });
    //     }
    //   } catch (err) {
    //     // Handle errors
    //     console.error("Error updating state after togglePomo:", err);
    //   }
    // }
  };

  const togglePomo = async () => {
    console.log("TOGGLE POMO");
    dispatch({ type: pomodoroReducerActions.TOGGLE_AUTO_POMO });
    if (username) {
    }
  };

  const skipToBreak = () => {
    dispatch({ type: pomodoroReducerActions.SKIP_TO_BREAK });
  };

  const skipToPomo = () => {
    dispatch({ type: pomodoroReducerActions.SKIP_TO_POMO });
  };

  const setSliderData = (name, value) => {
    dispatch({
      type: pomodoroReducerActions.SET_SLIDER_DATA,
      payload: { name, value },
    });
  };

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
        setToggleLogin,
        setShowOrHideSetting,
        setShowSetting,
        setHideSetting,
        skipToBreak,
        skipToPomo,
        setNotInSession,
        inSession,
        setSliderData,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};
