import { useState, useEffect, useRef } from "react";
import { POMODORO, SHORTBREAK, LONGBREAK, SECONDS } from "../utils/constants";
import { usePomodoroContext } from "./usePomodoroContext";

/**
 * create a hook called pomodoro timer that allows user to create pomodoro timer
 *
 * @param {Int16Array} pomodoro The int
 * @param {Int16Array} shortBreak The int
 * @param {Int16Array} longBreak The int
 * @param {Int16Array} pomodoro The int
 *
 * @returns {object} sends the data that is important for pomodoro to function
 *
 * phase --- tells what phase timer is in.
 *           There are 3 different phases:
 *              - Pomodoro
 *              - Short Break
 *              - Long Break
 * minutes --- minutes that should be traversed
 * seconds --- seconds
 * isActive --- in the middle of timer (countdown is happening)
 * session --- total completed sessions (phase completed)
 * startTimer --- function to start timer
 * pauseTimer --- function to pause timer
 * resetTimer --- function to reset timer
 * skipPhase --- function to skip phase to next one
 * choosePhase --- function to choose which phase to start timer in
 * maxSeconds --- max seconds for that phase
 * remainingTime --- time remaining for that phase
 * setNewPomodoro --- used for resetting the timer
 * setAuto
 * resetSession
 */
const usePomodoroTimer = (pomodoro, shortBreak, longBreak) => {
  // using pomodoro context to play music
  // TODO: get all the settings data too.
  const {
    playAudio,
    studyStartSound,
    timerActive, // in the middle of the timer
    inSession,
    notInSession,
    autoPomo,
    autoBreak,
    longRelaxInterval,
  } = usePomodoroContext();

  const [pomoPhases, setPomoPhases] = useState({
    pomodoro: { minutes: pomodoro },
    shortBreak: { minutes: shortBreak },
    longBreak: { minutes: longBreak },
  });

  // console.log(pomoPhases);
  const [phase, setPhase] = useState(POMODORO);

  // Old Phase keeps track of the changes in phases (only updates when new phase changes after timer ends)
  const [oldPhase, setOldPhase] = useState(SHORTBREAK);

  const [minutes, setMinutes] = useState(pomoPhases.pomodoro.minutes);
  const [seconds, setSeconds] = useState(0);
  // is when countdown is happening (pause and play)
  const [isActive, setIsActive] = useState(false);
  // used for calculating delay on timer
  const [startTime, setStartTime] = useState(null);

  // how many rounds has been completed (pomodoro and break)
  const rotationRef = useRef(1);

  const [session, setSession] = useState(1);

  // const [maxSession, setMaxSession] = useState(10);
  // keeps track of seconds left (useful for calculating percentage of time passed)
  const [remainingTime, setRemainingTime] = useState(minutes * SECONDS);

  // play, paused, null (paused is used to know if you should reset the timer when start is pressed again)
  const [status, setStatus] = useState(null);

  // max seconds counted
  const [maxSeconds, setMaxSeconds] = useState(minutes * SECONDS);

  // if I should auto start break or pomodoro
  const [auto, setAuto] = useState({
    start: autoPomo,
    break: autoBreak,
  });

  useEffect(() => {
    let timeout;

    const tick = () => {
      const currentTime = new Date().getTime();
      const elapsedMilliseconds = currentTime - startTime;

      if (seconds === 0) {
        if (minutes === 0) {
          // Timer is complete, but don't switch phase automatically
          setIsActive(false);

          if (
            (!auto.break && !auto.start) ||
            (auto.break &&
              (phase === SHORTBREAK || phase === LONGBREAK) &&
              !auto.start) ||
            (auto.start && phase === POMODORO && !auto.break)
          ) {
            console.log("GOTO TO STATUS");
            setStatus(null);
          }

          // play audio
          playAudio(studyStartSound, true);

          // updating phase only when state changes from one to another
          if (
            (phase === POMODORO && oldPhase !== POMODORO) ||
            ((phase === SHORTBREAK || phase === LONGBREAK) &&
              oldPhase === POMODORO)
          ) {
            rotationRef.current += 1;
          }
          console.log(`current rotation: ${rotationRef.current}\n
          long relax: ${longRelaxInterval}`);
          const newSession = Math.round(rotationRef.current / 2);

          setSession(newSession);
          setPhase((oldState) => {
            let newState;
            if (oldState === SHORTBREAK || oldState === LONGBREAK) {
              newState = POMODORO;
            } else if (
              newSession % longRelaxInterval === 0 &&
              newSession !== 0
            ) {
              newState = LONGBREAK;
            } else {
              newState = SHORTBREAK;
            }

            console.log("timer end change phase:", newState);
            setOldPhase(oldState);

            setMinutes(() => {
              const newMin = pomoPhases[newState].minutes;
              setMaxSeconds(newMin * SECONDS);
              setRemainingTime(newMin * SECONDS);
              return newMin;
            });

            console.log(`old phase: ${oldState} new phase: ${newState}`);
            return newState;
          });

          notInSession();
        } else {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(SECONDS - 1);
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

  useEffect(() => {
    console.log("Got to end of session");
    notInSession();
  }, [oldPhase]);

  useEffect(() => {
    console.log("Auto Start/Break:");
    if (auto.start && phase === POMODORO && !timerActive && status) {
      choosePhase(POMODORO);
      startTimer();
      return;
    }

    if (auto.break && phase === SHORTBREAK && !timerActive && status) {
      choosePhase(SHORTBREAK);
      startTimer();
      return;
    }

    if (auto.break && phase === LONGBREAK && !timerActive && status) {
      choosePhase(LONGBREAK);
      startTimer();
      return;
    }
  }, [auto.start, auto.break, phase, timerActive]);

  // FUNCTIONS
  const startTimer = () => {
    console.log("current phase:", phase);
    setStartTime(new Date().getTime());
    setIsActive(true);
    console.log(status);
    if (status !== "pause") {
      setMaxSeconds(() => {
        const newMaxSec = minutes * SECONDS;
        setRemainingTime(newMaxSec);
        return newMaxSec;
      });

      inSession();
      // setTimerStarted(true);
    }
    setStatus("play");
  };

  const pauseTimer = () => {
    setIsActive(false);
    setStatus("pause");
    console.log("Timer Paused");
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(() => {
      const newMin = pomoPhases[phase].minutes;
      setMaxSeconds(newMin * SECONDS);
      setRemainingTime(newMin * SECONDS);
      return newMin;
    });
    setSeconds(0);
    notInSession();
    // setTimerStarted(false);
    setStatus(null);
    console.log("Timer Reseted");
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
        setMaxSeconds(newMin * SECONDS);
        setRemainingTime(newMin * SECONDS);
        return newMin;
      });
      setSeconds(0);
    }
  };

  const choosePhase = (selectedPhase) => {
    // TODO: create an alert when chaning phase.
    // TODO: thinking of creating a custom hook that will alert me but will also be used for different things in the future.

    console.log("Yes change Phase");
    setIsActive(false);
    setPhase(selectedPhase);
    setMinutes(() => {
      const newMin = pomoPhases[selectedPhase].minutes;
      setMaxSeconds(newMin * SECONDS);
      setRemainingTime(newMin * SECONDS);

      return newMin;
    });
    setSeconds(0);
    notInSession();
    // setTimerStarted(false);
    setStatus(null);
    console.log("Choose Phase");
    return true;
  };

  const setNewPomodoro = (pomo, brk, longBrk) => {
    console.log("SET NEW POMODORO");
    choosePhase(POMODORO);
    resetTimer();
    console.log("GOT HERE");
    setPomoPhases(() => {
      const newPhase = {
        pomodoro: { minutes: pomo },
        shortBreak: { minutes: brk },
        longBreak: { minutes: longBrk },
      };
      setMinutes(pomo);
      console.log("changing pomoPhase");
      return newPhase;
    });
    return true;
  };

  const resetSession = () => {
    const confirm = window.confirm(
      "Do you want to reset your session counter?"
    );
    if (!confirm) return false;
    setSession(1);
    rotationRef.current = 1;
    return true;
  };

  return {
    phase,
    minutes,
    seconds,
    isActive,
    session,
    // timerStarted,
    startTimer,
    pauseTimer,
    resetTimer,
    skipPhase,
    choosePhase,
    maxSeconds,
    remainingTime,
    setNewPomodoro,
    setAuto,
    resetSession,
  };
};

export default usePomodoroTimer;
