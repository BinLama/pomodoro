import { useContext } from "react";
import { PomodoroContext } from "../context/PomodoroContext";

export const usePomodoroContext = () => {
  const context = useContext(PomodoroContext);
  if (!context) {
    throw Error(
      "usePomodoroContext must be used inside an PomodoroContextProvider"
    );
  }

  return context;
};
