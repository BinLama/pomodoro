import Navigation from "./components/navigation/Navigation";
import "./scss/App.scss";
import Pomodoro from "./components/pomodoro/Pomodoro";
import Tasks from "./components/tasks/Tasks";
import { PomodoroContextProvider } from "./context/PomodoroContext";
import { TaskContextProvider } from "./context/TaskContext";
import Test from "./test";

function App() {
  return (
    <main>
      {/* <Test /> */}
      <PomodoroContextProvider>
        <Navigation />
        <Pomodoro />
      </PomodoroContextProvider>
      {/* <TaskContextProvider>
        <Tasks />
      </TaskContextProvider> */}
    </main>
  );
}

export default App;
