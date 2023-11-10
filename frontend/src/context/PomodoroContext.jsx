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

  const [chosenMusic, setChosenMusic] = useState("bell");
  const [audio, setAudio] = useState(new Audio(sounds[chosenMusic]));
  const [volume, setVolume] = useState(10);
  const [mute, setMute] = useState(false);
  const [autoPomo, setAutoPomo] = useState(false);
  const [autoBreak, setAutoBreak] = useState(true);
  const [longRelaxInterval, setLongRelaxInterval] = useState(4);
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
      console.log("Setting chosen", data);
      return data;
    });
  };

  const playAudio = (music, pomo = false) => {
    if (mute && pomo) return;
    const newMusic = sounds[music];
    if (audio) {
      audio.pause();
    }

    if (music !== chosenMusic) {
      const newAudio = new Audio(newMusic);
      setAudio(newAudio);
      newAudio.play().catch((e) => {
        console.log("New audio play error");
      });
      return;
    }
    audio.play().catch((e) => {
      console.log("Old audio play error");
    });
  };

  const handleVolumeChange = (loudness) => {
    setVolume(loudness);
    audio.volume = loudness / 100;
  };

  const changeMusic = (music) => {
    if (mute) setMute(false);
    playAudio(music);
    setChosenMusic(() => {
      const newMusic = music;
      console.log(newMusic);
      return newMusic;
    });
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
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};
