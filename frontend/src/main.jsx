import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { PomodoroContextProvider } from "./context/PomodoroContext";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <PomodoroContextProvider>
        <App />
      </PomodoroContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
