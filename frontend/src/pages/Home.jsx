import { TaskContextProvider } from "../context/TaskContext";
import Navigation from "../components/navigation/Navigation";
import Pomodoro from "../components/home/pomodoro/Pomodoro";
import Tasks from "../components/home/tasks/Tasks";
import { usePomodoroContext } from "../hooks/usePomodoroContext";

const Home = () => {
  const { showSetting, showOrHideSetting } = usePomodoroContext();
  return (
    <>
      <Navigation />
      {showSetting && (
        <div className="overlay absolute" onClick={showOrHideSetting}></div>
      )}

      <Pomodoro />
      <TaskContextProvider>
        <Tasks />
      </TaskContextProvider>
    </>
  );
};
export default Home;
