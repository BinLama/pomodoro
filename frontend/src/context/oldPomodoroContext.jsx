import { createContext, useState } from "react";
import { customFocusLevel, sounds } from "../data";
import { CUSTOM } from "../utils/constants";

export const PomodoroContext = createContext();

export const PomodoroContextProvider = ({ children }) => {
  // keep track of the setting change
  // pomodoro should call the value and change it.
  const [chosen, setChosen] = useState({
    data: customFocusLevel.choices[1].name,
    newTimer: {
      pomodoro: customFocusLevel.choices[1].pomodoro,
      break: customFocusLevel.choices[1].break,
      longBreak: customFocusLevel.choices[1].longBreak,
    },
  });

  // Sets up what named music to play
  const [chosenMusic, setChosenMusic] = useState("bell");

  // Sets up the audio to be played when timer ends
  const [audio, setAudio] = useState(new Audio(sounds[chosenMusic]));

  // controls alarm volume
  const [volume, setVolume] = useState(10);
  // controls mute and unmute of volume
  const [mute, setMute] = useState(false);
  // controls auto start pomodoro
  const [autoPomo, setAutoPomo] = useState(false);
  // controls auto start break
  const [autoBreak, setAutoBreak] = useState(false);
  const [longRelaxInterval, setLongRelaxInterval] = useState(4);
  const [changeToBreak, setChangeToBreak] = useState(0);
  const [changeToPomo, setChangeToPomo] = useState(0);
  // Control setings
  const [showSetting, setShowSetting] = useState(false);

  // control toggling of setting
  const showOrHideSetting = () => {
    setShowSetting((prev) => !prev);
  };
  // get all the data here

  const updateTimer = (type, pomodoro, shortBreak, longBreak) => {
    // stop the same update when it's already selected
    if (
      (type === chosen.data && type !== CUSTOM) ||
      (type === CUSTOM &&
        chosen.newTimer.pomodoro === pomodoro &&
        chosen.newTimer.break === shortBreak &&
        chosen.newTimer.longBreak === longBreak)
    ) {
      return;
    }
    console.log("DATA:", pomodoro, shortBreak, longBreak);

    /* dispatch("UPDATE_TIMER", payload: {
      data: type,
        newTimer: {
          ...state.newTimer,
          pomodoro,
          break: shortBreak,
          longBreak,
        },
    })
     */
    setChosen((oldTimer) => {
      const data = {
        data: type,
        newTimer: {
          ...oldTimer.newTimer,
          pomodoro,
          break: shortBreak,
          longBreak,
        },
      };
      return data;
    });
    console.log("Setting chosen", data);
  };

  const playAudio = (music, pomo = false) => {
    if (mute && pomo) return;
    const newMusic = sounds[music];
    if (audio) {
      audio.pause();
    }

    if (music !== chosenMusic) {
      const newAudio = new Audio(newMusic);
      newAudio.volume = volume / 100;

      /* dispatch("PLAY_AUDIO", payload: {audio: newAudio, music: music}) */
      setAudio(newAudio);
      newAudio.play().catch((e) => {
        console.log("New audio play error");
      });
      setChosenMusic(music);
      return;
    }
    audio.play().catch((e) => {
      console.log("old audio play error");
    });
  };

  const handleVolumeChange = (loudness) => {
    // dispatch("CHANGE_VOLUME", payload: loudness)
    setVolume(loudness);
    audio.volume = loudness / 100;
  };

  const changeMusic = (music) => {
    /* dispatch("CHANGE_MUSIC", payload: music) */
    // remove the mute cause mute will always be set to false
    if (mute) setMute(false);
    setChosenMusic(() => {
      const newMusic = music;
      return newMusic;
    });
    playAudio(music);
  };

  const toggleMute = () => {
    setMute((oldMute) => {
      return !oldMute;
    });
  };

  const toggleBreak = () => {
    setAutoBreak((prev) => !prev);
  };

  const togglePomo = () => {
    setAutoPomo((prev) => !prev);
  };

  const skipToBreak = () => {};
  const skipToPomo = () => {};

  return (
    <PomodoroContext.Provider
      value={{
        chosen,
        setChosen,
        updateTimer,
        playAudio,
        mute,
        setMute,
        volume,
        handleVolumeChange,
        chosenMusic,
        setChosenMusic,
        changeMusic,
        toggleMute,
        autoPomo,
        togglePomo,
        autoBreak,
        toggleBreak,
        longRelaxInterval,
        setLongRelaxInterval,
        // used for skipping phases
        setChangeToBreak,
        changeToBreak,
        setChangeToPomo,
        changeToPomo,
        // control setting,
        showSetting,
        showOrHideSetting,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};