import { usePomodoroContext } from "../../../../hooks/usePomodoroContext";

const CustomAutoStart = () => {
  const { autoPomo, autoBreak, togglePomo, toggleBreak } = usePomodoroContext();
  return (
    <div className="auto__start-options">
      <div className="auto__start-options_div">
        <p>Auto Start Pomodoro</p>
        <div className="toggle">
          <label className="switch">
            <input type="checkbox" checked={autoPomo} onChange={togglePomo} />
            <span className="mover round"></span>
          </label>
        </div>
      </div>
      <div className="auto__start-options_div">
        <p>Auto Start Break</p>
        <div className="toggle">
          <label className="switch">
            <input type="checkbox" checked={autoBreak} onChange={toggleBreak} />
            <span className="mover round"></span>
          </label>
        </div>
      </div>
    </div>
  );
};
export default CustomAutoStart;
