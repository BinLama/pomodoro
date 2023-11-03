import { useState, useEffect, useRef } from "react";
import { POMODORO, SHORTBREAK, LONGBREAK } from "../utils/constants";

const usePomodoroTimer = (
  pomodoro = 25,
  shortBreak = 5,
  longBreak = 15,
  longRelaxInterval = 4
) => {
  const pomoPhases = {
    pomodoro: { minutes: pomodoro },
    shortBreak: { minutes: shortBreak },
    longBreak: { minutes: longBreak },
  };

  const [phase, setPhase] = useState(POMODORO);
  const [minutes, setMinutes] = useState(pomoPhases.pomodoro.minutes);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false); // let the countdonw happen
  const [startTime, setStartTime] = useState(null); // used for calculating delay on timer
  const rotationRef = useRef(1);
  const [timerStarted, setTimerStarted] = useState(false); // start and pause tracker
  const [session, setSession] = useState(1);
  const [remainingTime, setRemainingTime] = useState(minutes * 60); // keeps track of seconds left (useful for calculating percentage of time passed)
  const [status, setStatus] = useState(null);
  const [maxSeconds, setMaxSeconds] = useState(minutes * 60); // max seconds counted

  useEffect(() => {
    let timeout;

    const tick = () => {
      const currentTime = new Date().getTime();
      const elapsedMilliseconds = currentTime - startTime;

      if (seconds === 0) {
        if (minutes === 0) {
          // Timer is complete, but don't switch phase automatically
          setIsActive(false);
          rotationRef.current += 1;
          setSession(rotationRef.current % longRelaxInterval);
          setPhase((oldState) => {
            let newState;
            if (oldState === SHORTBREAK || oldState === LONGBREAK) {
              newState = POMODORO;
            } else {
              // if (rotationRef.current %)
              newState = SHORTBREAK;
            }

            setMinutes(() => {
              const newMin = pomoPhases[newState].minutes;
              setMaxSeconds(newMin * 60 - 1);
              return newMin;
            });
            console.log("change phase:", newState);

            return newState;
          });

          setTimerStarted(false);
          setRemainingTime(() => {
            return maxSeconds;
          });
        } else {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        }
      } else {
        setSeconds((prevSeconds) => {
          if (prevSeconds == 0) {
            return prevSeconds;
          }
          return prevSeconds - 1;
        });
      }

      if (seconds !== 0 || minutes !== 0) {
        setRemainingTime((oldTime) => {
          console.log("old time:", oldTime);
          return oldTime - 1;
        });
      }
      // calculating the delay of running the tick function
      const remainingMilliseconds = 1000 - (elapsedMilliseconds % 1000);

      // Set a new timeout for the next tick, adjusting for the elapsed time
      timeout = setTimeout(tick, remainingMilliseconds);
    };

    if (isActive) {
      setStartTime(new Date().getTime());
      timeout = setTimeout(tick, 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isActive, minutes, seconds, startTime]);

  const startTimer = () => {
    console.log("current phase:", phase);
    setStartTime(new Date().getTime());
    setIsActive(true);

    if (status === "play" || status === null) {
      setMaxSeconds(() => {
        const newMaxSec = minutes * 60;
        setRemainingTime(newMaxSec);
        return newMaxSec;
      });

      setTimerStarted(true);
    }
    setStatus("play");
  };

  const pauseTimer = () => {
    setIsActive(false);
    setStatus("paused");
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(() => {
      const newMin = pomoPhases[phase].minutes;
      setMaxSeconds(newMin * 60);
      setRemainingTime(newMin * 60);
      return newMin;
    });
    setSeconds(0);
    setTimerStarted(false);
    setStatus(null);
  };

  const skipPhase = () => {
    // Allow switching phases only when the timer is not active
    if (!isActive) {
      // Determine the next phase
      let nextPhase;
      if (phase === POMODORO) {
        console.log(minutes);
        nextPhase = minutes === 5 ? LONGBREAK : SHORTBREAK;
      } else {
        nextPhase = POMODORO;
      }

      setPhase(nextPhase);

      setMinutes(() => {
        const newMin = pomoPhases[nextPhase].minutes;
        setMaxSeconds(newMin * 60);
        return newMin;
      });
      setSeconds(0);
    }
  };

  const choosePhase = (selectedPhase) => {
    setIsActive(false);
    setPhase(selectedPhase);
    setMinutes(() => {
      const newMin = pomoPhases[selectedPhase].minutes;
      setMaxSeconds(newMin * 60);
      return newMin;
    });
    setSeconds(0);
    setTimerStarted(false);
  };

  return {
    phase,
    minutes,
    seconds,
    isActive,
    session,
    timerStarted,
    startTimer,
    pauseTimer,
    resetTimer,
    skipPhase,
    choosePhase,
    maxSeconds,
    remainingTime,
  };
};

export default usePomodoroTimer;
