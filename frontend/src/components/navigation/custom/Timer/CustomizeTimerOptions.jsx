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

  // const [sliderData, setSliderData] = useState({});
  // const { setItem, getItem } = useLocalStorage("customSlider");

  // useEffect(() => {
  //   console.log("GOT TO TYPE CUSTOM");

  //   if (type === CUSTOM) {
  //     const custom = getItem();
  //     setSliderData(() => {
  //       return (
  //         custom || {
  //           pomodoro: slider[0].value,
  //           shortBreak: slider[1].value,
  //           longBreak: slider[2].value,
  //         }
  //       );
  //     });
  //   }
  // }, []);

  return (
    <div className="customize__timer-options__input">
      <input
        type="radio"
        value={name}
        onChange={(e) => {
          // restoring the slider value on setting click
          if (type === CUSTOM) {
            const { pomodoro, smallBreak, longBreak } = sliderData;
            updateTimer(e.target.value, pomodoro, smallBreak, longBreak);
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
