import { createContext, useEffect, useReducer, useRef } from "react";
import { customFocusLevel, sounds } from "../data";
import { CUSTOM, pomodoroReducerActions } from "../utils/constants";
import {
  INITIAL_POMODORO_STATE,
  pomodoroReducer,
} from "../reducers/PomodoroReducer";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAuthContext } from "../hooks/useAuthContext";

export const PomodoroContext = createContext();
export const PomodoroContextProvider = ({ children }) => {
  const { user } = useAuthContext();
  const { setItem, getItem } = useLocalStorage("pomodoroContext");

  // setting the initial value
  const initialData = getItem() || INITIAL_POMODORO_STATE;
  const [state, dispatch] = useReducer(pomodoroReducer, initialData);

  const getAllData = () => {
    if (!user) {
      // Get data from local storage
      const value = getItem();
      console.log("GET ITEM dispatch");
      if (value) {
        dispatch({
          type: pomodoroReducerActions.GET_USER_POMO_DATA,
          payload: value,
        });
      }
    } else {
      // make a call to the database
    }
  };

  useEffect(() => {
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

  const updateTimer = (type, pomodoro, shortBreak, longBreak) => {
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

    console.log(state);
    // getItem(state)
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

    if (music !== state.chosenMusic) {
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

  const handleVolumeChange = (loudness) => {
    console.log("AUDIO:", state.audio);
    state.audio.volume = loudness / 100;
    dispatch({ type: pomodoroReducerActions.CHANGE_VOLUME, payload: loudness });
  };

  const changeMusic = (music) => {
    dispatch({ type: pomodoroReducerActions.CHANGE_MUSIC, payload: music });
    playAudio(music);
  };

  const toggleMute = () => {
    dispatch({ type: pomodoroReducerActions.TOGGLE_MUTE });
  };

  const toggleBreak = () => {
    dispatch({ type: pomodoroReducerActions.TOGGLE_AUTO_BREAK });
  };

  const togglePomo = () => {
    dispatch({ type: pomodoroReducerActions.TOGGLE_AUTO_POMO });
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
