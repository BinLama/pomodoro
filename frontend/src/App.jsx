import Navigation from "./components/navigation/Navigation";
import "./scss/App.scss";
import Pomodoro from "./components/pomodoro/Pomodoro";
import Tasks from "./components/tasks/Tasks";
import { PomodoroContextProvider } from "./context/PomodoroContext";
import { TaskContextProvider } from "./context/TaskContext";
import Test from "./test";
import { useState } from "react";

function App() {
  const [showSetting, setShowSetting] = useState(false);
  const showOrHideSetting = () => {
    setShowSetting((prev) => !prev);
  };

  return (
    <main>
      {/* <Test /> */}
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
      {/* <TaskContextProvider>
        <Tasks />
      </TaskContextProvider> */}
    </main>
  );
}

export default App;
