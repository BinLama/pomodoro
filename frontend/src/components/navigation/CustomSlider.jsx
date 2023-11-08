import SingleSlider from "./SingleSlider";
import { usePomodoroContext } from "../../hooks/usePomodoroContext";
import { CUSTOM } from "../../utils/constants";
import { useEffect, useState } from "react";

const CustomSlider = ({ slider }) => {
  const { chosen, updateTimer } = usePomodoroContext();
  // keep track of the slide update
  const [sliderData, setSliderData] = useState({
    pomodoro: chosen.newTimer.pomodoro,
    shortBreak: chosen.newTimer.break,
    longBreak: chosen.newTimer.longBreak,
  });

  useEffect(() => {
    const { pomodoro, shortBreak, longBreak } = sliderData;
    const { pomodoro: pomo, break: sb, longBreak: lb } = chosen.newTimer;

    // stop the update at the beginning
    if (
      chosen.data === CUSTOM &&
      pomo === pomodoro &&
      sb === shortBreak &&
      lb === longBreak
    )
      return;
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
