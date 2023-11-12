import "./scss/App.scss";
import Home from "./pages/Home";
import { PomodoroContextProvider } from "./context/PomodoroContext";

function App() {
  return (
    <main>
      <PomodoroContextProvider>
        <Home />
      </PomodoroContextProvider>
    </main>
  );
}

export default App;
