import { useState } from "react";
import { usePomodoroContext } from "../../../../hooks/usePomodoroContext";
import CustomSlider from "./CustomSlider";
import { CUSTOM } from "../../../../utils/constants";

const CustomizeTimerOptions = ({
  name,
  pomodoro,
  break: shortBreak,
  longBreak,
  type,
  slider,
}) => {
  const { chosen, updateTimer } = usePomodoroContext();

  // for custom radio
  return (
    <div className="customize__timer-options__input">
      <input
        type="radio"
        value={name}
        onChange={(e) => {
          if (type === CUSTOM) {
            const pomo = slider[0].value;
            const sb = slider[1].value;
            const lb = slider[1].value;
            updateTimer(e.target.value, pomo, sb, lb);
            return;
          }
          updateTimer(e.target.value, pomodoro, shortBreak, longBreak);
        }}
        id={name}
        checked={chosen.data === name}
      />
      <label htmlFor={name} className="label">
        <span>{name}</span>
        {type !== CUSTOM ? (
          <>
            <span className="time">
              {pomodoro} min &#xb7; {shortBreak} min &#xb7; {longBreak} min
            </span>
          </>
        ) : (
          <>
            <CustomSlider slider={slider} />
          </>
        )}
      </label>
    </div>
  );
};
export default CustomizeTimerOptions;
