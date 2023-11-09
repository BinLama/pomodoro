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

  const [volume, setVolume] = useState(10);
  const [mute, setMute] = useState(false);
  const [chosenMusic, setChosenMusic] = useState();

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
      console.log(data);
      return data;
    });
  };

  const play = (name, active = true) => {
    if (mute && !active) return;
    const music = sounds[name];
    const audio = new Audio(music);
    audio.volume = volume / 100;
    audio.play();
  };

  return (
    <PomodoroContext.Provider
      value={{
        chosen,
        setChosen,
        updateTimer,
        play,
        mute,
        setMute,
        volume,
        setVolume,
        chosenMusic,
        setChosenMusic,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};
