import { useState, useEffect, createRef } from "react";

function PomodoroApp() {
  const [timer, setTimer] = useState(1 * 10); // 25 minutes timer in seconds
  const [isRunning, setIsRunning] = useState(false);

  const audioRef = createRef();

  const playAudio = () => {
    audioRef.current.play();
  };

  const startTimer = () => {
    setIsRunning(true);
    // Start the countdown logic here
    // You can use the setTimeout function to decrease the timer
    // and call playAudio() when the timer reaches 0.
  };

  const pauseTimer = () => {
    setIsRunning(false);
    // Pause the timer logic
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimer(1 * 10); // Reset the timer to 25 minutes
  };

  useEffect(() => {
    // Add your timer countdown logic here
    let countdown;

    if (isRunning) {
      countdown = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1);
        } else {
          clearInterval(countdown);
          playAudio(); // Play audio when the timer reaches 0
        }
      }, 1000); // Decrease the timer every second
    } else {
      clearInterval(countdown);
    }

    return () => {
      clearInterval(countdown);
    };
  }, [timer, isRunning]);

  return (
    <div>
      <h1>Pomodoro Timer</h1>
      <p>
        Time Remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}
        {timer % 60}
      </p>

      <button onClick={startTimer}>Start</button>
      <button onClick={pauseTimer}>Pause</button>
      <button onClick={resetTimer}>Reset</button>

      <audio ref={audioRef}>
        <source src="/sounds/bell.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default PomodoroApp;
