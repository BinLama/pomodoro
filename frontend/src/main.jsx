import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { PomodoroContextProvider } from "./context/PomodoroContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
