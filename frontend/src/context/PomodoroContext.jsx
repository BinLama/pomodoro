import { createContext } from "react";

export const PomodoroContext = createContext();

export const PomodoroContextProvider = ({ children }) => {
  return (
    <PomodoroContext.Provider value={{}}>{children}</PomodoroContext.Provider>
  );
};
