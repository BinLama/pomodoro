import SingleSlider from "../../SingleSlider";
import { usePomodoroContext } from "../../../../hooks/usePomodoroContext";
import { CUSTOM } from "../../../../utils/constants";
import { useEffect, useState } from "react";

const CustomSlider = ({ slider }) => {
  const { chosen, updateTimer, sliderData, setSliderData } =
    usePomodoroContext();

  /**
   * keep track of the slide update
   */
  const [count, setCount] = useState(0);

  useEffect(() => {
    const { customStudyTime, customRelaxTime, customLongRelaxTime } =
      sliderData;
    console.log("got here");
    const { pomodoro, shortBreak, longBreak } = chosen.newTimer;

    setCount(count + 1);
    console.log(count);
    console.log("sliderData Slider", chosen, sliderData);

    // stop the update at the beginning
    if (chosen.data !== CUSTOM) return;
    // stop update without new values
    if (
      customStudyTime === pomodoro &&
      customRelaxTime === shortBreak &&
      customLongRelaxTime === longBreak
    )
      return;

    console.log("slider data is changing");
    // update the timer value on
    updateTimer(CUSTOM, customStudyTime, customRelaxTime, customLongRelaxTime);
    // store the custom timer data in localstorage
    // setSlider(sliderData);
  }, [sliderData]);

  return (
    <div className="slider">
      <div className="slider__container">
        {slider.map((slide) => {
          return (
            <SingleSlider
              key={slide.type}
              {...slide}
              sliderData={sliderData[slide.name]}
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
