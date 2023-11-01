import Navigation from "./components/Navigation";
import "./scss/App.scss";
import Pomodoro from "./components/Pomodoro";
import Tasks from "./components/tasks/Tasks";
import { PomodoroContextProvider } from "./context/PomodoroContext";

function App() {
  return (
    <main>
      <PomodoroContextProvider>
        {/* <Navigation /> */}
        {/* <Pomodoro /> */}
      </PomodoroContextProvider>
      <Tasks />
    </main>
  );
}

export default App;
