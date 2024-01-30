import SingleSlider from "../../SingleSlider";
import { usePomodoroContext } from "../../../../hooks/usePomodoroContext";
import { CUSTOM } from "../../../../utils/constants";
import { useEffect } from "react";

const CustomSlider = ({ slider }) => {
  const { chosen, updateTimer, sliderData, setSliderData, setSlider } =
    usePomodoroContext();

  /**
   * keep track of the slide update
   */

  useEffect(() => {
    const { pomodoro, shortBreak, longBreak } = sliderData;
    const { pomodoro: pomo, shortBreak: sb, longBreak: lb } = chosen.newTimer;
    console.log("sliderData Slider", chosen, sliderData);

    // stop the update at the beginning
    if (chosen.data !== CUSTOM) return;
    // stop update without new values
    if (pomo === pomodoro && sb === shortBreak && lb === longBreak) return;
    // update the timer value on
    updateTimer(CUSTOM, pomodoro, shortBreak, longBreak);
    // store the custom timer data in localstorage
    setSlider(sliderData);
  }, [sliderData]);

  return (
    <div className="slider">
      <div className="slider__container">
        {slider.map((slide) => {
          return (
            <SingleSlider
              key={slide.type}
              {...slide}
              sliderData={sliderData[slide.type]}
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
