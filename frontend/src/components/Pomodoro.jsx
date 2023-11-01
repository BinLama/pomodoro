import usePomodoroTimer from "../hooks/usePomodoroTimer";
import { POMODORO, SHORTBREAK, LONGBREAK } from "../utils/constants";

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
  } = usePomodoroTimer(1, 1); // this sets the pomodoro and break to 1min

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
        <div className="timer__cntdwn-svg">
          {/* create some kind of circle that shows the countdown */}
          {/* first circle will be lighter and another will be darker and will cover the circle based on percentage of seconds passed. */}
          {/* <svg height="100" width="100">
            <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" />
          </svg> */}
        </div>
        <div className="timer__cntdwn-div">
          <h1>{`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
            2,
            "0"
          )}`}</h1>
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
      <div className="timer__controller">
        {timerStarted ? (
          <>
            <button onClick={pauseTimer} type="button" disabled={!isActive}>
              Pause
            </button>
            <button onClick={resetTimer} type="button" disabled={isActive}>
              Restart
            </button>
          </>
        ) : (
          <>
            <button onClick={startTimer} type="button" disabled={isActive}>
              Start
            </button>
            <button onClick={skipPhase} type="button" disabled={isActive}>
              Skip
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Pomodoro;
