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
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const rotationRef = useRef(1);
  const [timerStarted, setTimerStarted] = useState(false);
  const [session, setSession] = useState(1);
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

            setMinutes(() => pomoPhases[newState].minutes);
            console.log("change phase:", newState);
            return newState;
          });

          setTimerStarted(false);
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
    setIsActive(true);
    setStartTime(new Date().getTime());
    setTimerStarted(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(pomoPhases[phase].minutes);
    setSeconds(0);
    setTimerStarted(false);
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
      setMinutes(pomoPhases[nextPhase].minutes);
      setSeconds(0);
    }
  };

  const choosePhase = (selectedPhase) => {
    setIsActive(false);
    setPhase(selectedPhase);
    setMinutes(pomoPhases[selectedPhase].minutes);
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
  };
};

export default usePomodoroTimer;
