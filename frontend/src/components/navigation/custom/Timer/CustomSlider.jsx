import SingleSlider from "../../SingleSlider";
import { usePomodoroContext } from "../../../../hooks/usePomodoroContext";
import { CUSTOM } from "../../../../utils/constants";
import { useEffect, useState } from "react";

const CustomSlider = ({ slider }) => {
  const { chosen, updateTimer } = usePomodoroContext();
  // keep track of the slide update

  const [sliderData, setSliderData] = useState(() => {
    return {
      // TODO: should be getting the lastest value not the set value from the previous set.
      pomodoro: slider[0].value,
      shortBreak: slider[1].value,
      longBreak: slider[2].value,
    };
  });

  useEffect(() => {
    const { pomodoro, shortBreak, longBreak } = sliderData;
    const { pomodoro: pomo, break: sb, longBreak: lb } = chosen.newTimer;
    console.log("custom Slider", chosen, sliderData);
    // stop the update at the beginning
    if (chosen.data !== CUSTOM) return;
    // stop update without new values
    if (pomo === pomodoro && sb === shortBreak && lb === longBreak) return;
    updateTimer(CUSTOM, pomodoro, shortBreak, longBreak);
  }, [sliderData]);

  return (
    <div className="slider">
      <div className="slider__container">
        {slider.map((slide) => {
          return (
            <SingleSlider
              key={slide.type}
              {...slide}
              sliderData={sliderData}
              setSliderData={setSliderData}
              level={chosen.data === CUSTOM}
            />
          );
        })}
      </div>
    </div>
  );
};
export default CustomSlider;
