import { useEffect } from "react";
import { usePomodoroContext } from "../../../hooks/usePomodoroContext";
import usePomodoroTimer from "../../../hooks/usePomodoroTimer";
import { POMODORO, SHORTBREAK, LONGBREAK } from "../../../utils/constants";

const MAX_CURCUM = 295.301;

const Pomodoro = () => {
  // Context
  const {
    chosen,
    autoBreak,
    autoPomo,
    longRelaxInterval,
    changeToBreak,
    changeToPomo,
    showOrHideSetting,
    timerActive,
    maxSession,
  } = usePomodoroContext();

  // POMODORO HOOKS
  const {
    phase,
    minutes,
    seconds,
    startTimer,
    pauseTimer,
    resetTimer,
    skipPhase,
    isActive,
    session,
    choosePhase,
    remainingTime,
    maxSeconds,
    setNewPomodoro,
    setAuto,
    resetSession,
  } = usePomodoroTimer(
    chosen.newTimer.pomodoro,
    chosen.newTimer.shortBreak,
    chosen.newTimer.longBreak
  ); // this sets the pomodoro and shortBreak to 1min

  useEffect(() => {
    console.log("GOT to reset chosen");
    setNewPomodoro(
      chosen.newTimer.pomodoro,
      chosen.newTimer.shortBreak,
      chosen.newTimer.longBreak
    );
  }, [chosen]);

  useEffect(() => {
    setAuto(() => {
      const newAuto = { start: autoPomo, shortBreak: autoBreak };
      return newAuto;
    });
  }, [autoBreak, autoPomo]);

  useEffect(() => {
    if (changeToBreak === 0) return;
    if (phase === SHORTBREAK) return;
    choosePhase(SHORTBREAK);
  }, [changeToBreak]);

  useEffect(() => {
    if (changeToBreak === 0) return;
    if (phase === POMODORO) return;
    choosePhase(POMODORO);
  }, [changeToPomo]);

  return (
    <div className="timer">
      <div className="timer__stateSwitch">
        <button
          type="button"
          onClick={() => {
            choosePhase(POMODORO);
          }}
          className={phase === POMODORO ? "active pomodoro" : "pomodoro"}
          disabled={isActive}
        >
          Pomodoro
        </button>
        <button
          type="button"
          onClick={() => {
            choosePhase(SHORTBREAK);
          }}
          className={phase === SHORTBREAK ? "active" : ""}
          disabled={isActive}
        >
          Break
        </button>
        <button
          type="button"
          onClick={() => {
            choosePhase(LONGBREAK);
          }}
          className={phase === LONGBREAK ? "active" : ""}
          disabled={isActive}
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
                  style={{
                    strokeDashoffset: MAX_CURCUM * (remainingTime / maxSeconds),
                  }}
                  className="progress"
                ></circle>
              </svg>
            </div>
            <div
              className={
                phase === POMODORO
                  ? "is_pomodoro timer__cntdwn-div"
                  : "is_break timer__cntdwn-div"
              }
            >
              <h1>{`${String(minutes).padStart(2, "0")}:${String(
                seconds
              ).padStart(2, "0")}`}</h1>

              <div className="timer__cntdwn-level" onClick={showOrHideSetting}>
                {/* TODO: add an on click function that opens up setting */}
                <div>
                  <p>Level</p>
                  <p className="lvl">{chosen.data.toUpperCase()}</p>
                </div>
              </div>
              <div className="timer__cntdwn-session">
                {/* TODO: add on click functionality that resets the counter but show alert first*/}
                <div onClick={resetSession}>
                  <span>{`${String(session).padStart(2, "0")}`}</span>
                  {/* TODO:  this should be changed after getting the setting */}
                  <span> / {`${String(maxSession).padStart(2, "0")}`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="timer__controller">
          {!isActive ? (
            <>
              <button
                onClick={startTimer}
                className="btn primary"
                type="button"
              >
                Start
              </button>
            </>
          ) : (
            <>
              <button
                onClick={pauseTimer}
                className="btn primary"
                type="button"
              >
                Pause
              </button>
            </>
          )}
          {timerActive ? (
            <>
              <button
                onClick={resetTimer}
                className="btn secondary"
                type="button"
                disabled={isActive}
              >
                Restart
              </button>
            </>
          ) : (
            <>
              <button
                onClick={skipPhase}
                type="button"
                className="btn secondary"
                disabled={isActive}
              >
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
