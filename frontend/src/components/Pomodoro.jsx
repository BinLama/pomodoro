import { useEffect, useRef, useState } from "react";
import usePomodoroTimer from "../hooks/usePomodoroTimer";
import { POMODORO, SHORTBREAK, LONGBREAK } from "../utils/constants";

const MAX_CURCUM = 295.301;

const Pomodoro = () => {
  const {
    phase,
    minutes,
    seconds,
    startTimer,
    pauseTimer,
    resetTimer,
    skipPhase,
    isActive,
    timerStarted,
    session,
    choosePhase,
    remainingTime,
    maxSeconds,
  } = usePomodoroTimer(1, 1, 2); // this sets the pomodoro and break to 1min

  const circleRef = useRef(null);

  const circumference = (r) => {
    return 2 * Math.PI * r;
  };

  return (
    <div className="timer">
      <div className="timer__stateSwitch">
        <button
          type="button"
          onClick={() => {
            choosePhase(POMODORO);
          }}
          className={phase === POMODORO ? "active" : ""}
        >
          Pomodoro
        </button>
        <button
          type="button"
          onClick={() => {
            choosePhase(SHORTBREAK);
          }}
          className={phase === SHORTBREAK ? "active" : ""}
        >
          Break
        </button>
        <button
          type="button"
          onClick={() => {
            choosePhase(LONGBREAK);
          }}
          className={phase === LONGBREAK ? "active" : ""}
        >
          Long Break
        </button>
      </div>
      <div className="timer__cntdwn">
        <div className="timer__cntdwn-container">
          <div className="timer__cntdwn-relative">
            <div
              className={
                phase === POMODORO
                  ? "is_pomodoro timer__cntdwn-svg"
                  : "is_break timer__cntdwn-svg"
              }
              ref={circleRef}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
              >
                <circle
                  fill="transparent"
                  r="47%"
                  cx="50%"
                  cy="50%"
                  className="track"
                  strokeWidth="1.5"
                  data-circlecolor=""
                ></circle>
                <circle
                  fill="transparent"
                  r="47%"
                  cx="50%"
                  cy="50%"
                  strokeWidth="1.5"
                  strokeDasharray={MAX_CURCUM}
                  strokeDashoffset={MAX_CURCUM * (remainingTime / maxSeconds)}
                  //   minutes !== 0
                  //     ? circum - (circum * seconds) / (minutes * 60)
                  //     : circum
                  // }
                  className="progress"
                ></circle>
              </svg>
              {/* create some kind of circle that shows the countdown */}
              {/* first circle will be lighter and another will be darker and will cover the circle based on percentage of seconds passed. */}
              {/* <svg height="100" width="100">
            <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" />
          </svg> */}
            </div>
            <div className="timer__cntdwn-div">
              <h1>{`${String(minutes).padStart(2, "0")}:${String(
                seconds
              ).padStart(2, "0")}`}</h1>
              <div className="timer__cntdwn-level">
                <p>Level</p>
                <p className="lvl">Beginner</p>
              </div>
              <div className="timer__cntdwn-session">
                <span>{`${String(session).padStart(2, "0")}`}</span>

                {/* this should be changed after getting the setting */}
                <span> / 10</span>
              </div>
            </div>
          </div>
        </div>
        <div className="timer__controller">
          {!isActive ? (
            <>
              <button onClick={startTimer} type="button">
                Start
              </button>
            </>
          ) : (
            <>
              <button onClick={pauseTimer} type="button">
                Pause
              </button>
            </>
          )}
          {timerStarted ? (
            <>
              <button onClick={resetTimer} type="button" disabled={isActive}>
                Restart
              </button>
            </>
          ) : (
            <>
              <button onClick={skipPhase} type="button" disabled={isActive}>
                Skip
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
