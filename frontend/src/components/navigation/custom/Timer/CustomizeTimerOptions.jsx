import { usePomodoroContext } from "../../../../hooks/usePomodoroContext";
import CustomSlider from "./CustomSlider";
import { CUSTOM } from "../../../../utils/constants";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";

const CustomizeTimerOptions = ({
  name,
  pomodoro,
  shortBreak: shortBreak,
  longBreak,
  type,
  slider,
}) => {
  const { chosen, updateTimer, sliderData } = usePomodoroContext();

  return (
    <div className="customize__timer-options__input">
      <input
        type="radio"
        value={name}
        onChange={(e) => {
          // restoring the slider value on setting click
          if (type === CUSTOM) {
            // const { pomodoro, smallBreak, longBreak } = sliderData;
            const { customStudyTime, customRelaxTime, customLongRelaxTime } =
              sliderData;
            updateTimer(
              e.target.value,
              customStudyTime,
              customRelaxTime,
              customLongRelaxTime
            );
            return;
          }
          // restoring other timer choice values
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
