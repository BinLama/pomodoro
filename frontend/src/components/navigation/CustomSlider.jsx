import SingleSlider from "./SingleSlider";
import { usePomodoroContext } from "../../hooks/usePomodoroContext";
import { CUSTOM } from "../../utils/constants";
import { useEffect, useState } from "react";

const CustomSlider = ({ slider }) => {
  const { chosen, updateTimer } = usePomodoroContext();

  const [sliderData, setSliderData] = useState({
    pomodoro: parseInt(slider[0].value),
    shortBreak: parseInt(slider[1].value),
    longBreak: parseInt(slider[2].value),
  });

  useEffect(() => {
    const { pomodoro, shortBreak, longBreak } = sliderData;
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
