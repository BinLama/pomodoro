import { createContext, useState } from "react";
import { customFocusLevel } from "../data";
import { CUSTOM } from "../utils/constants";

export const PomodoroContext = createContext();

export const PomodoroContextProvider = ({ children }) => {
  const [chosen, setChosen] = useState({
    data: customFocusLevel.choices[1].name,
    newTimer: {
      pomodoro: customFocusLevel.choices[1].pomodoro,
      break: customFocusLevel.choices[1].break,
      longBreak: customFocusLevel.choices[1].longBreak,
    },
  });

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

  return (
    <PomodoroContext.Provider value={{ chosen, setChosen, updateTimer }}>
      {children}
    </PomodoroContext.Provider>
  );
};
