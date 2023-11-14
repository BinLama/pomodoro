import { TaskContextProvider } from "../context/TaskContext";
import Pomodoro from "../components/home/pomodoro/Pomodoro";
import Tasks from "../components/home/tasks/Tasks";

const Home = () => {
  return (
    <div className="main__functions">
      <Pomodoro />
      <TaskContextProvider>
        <Tasks />
      </TaskContextProvider>
    </div>
  );
};
export default Home;
