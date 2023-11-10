import { useState } from "react";
import { PomodoroContextProvider } from "../context/PomodoroContext";
import { TaskContextProvider } from "../context/TaskContext";
import Navigation from "../components/navigation/Navigation";
import Pomodoro from "../components/home/pomodoro/Pomodoro";
import Tasks from "../components/home/tasks/Tasks";

const Home = () => {
  const [showSetting, setShowSetting] = useState(false);
  const showOrHideSetting = () => {
    setShowSetting((prev) => !prev);
  };

  return (
    <>
      <PomodoroContextProvider>
        <Navigation
          showSetting={showSetting}
          showOrHideSetting={showOrHideSetting}
        />
        {showSetting && (
          <div className="overlay absolute" onClick={showOrHideSetting}></div>
        )}

        <Pomodoro />
      </PomodoroContextProvider>
      <TaskContextProvider>
        <Tasks />
      </TaskContextProvider>
    </>
  );
};
export default Home;
