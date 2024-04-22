// map so that it's easy to convert from slide type to pomodoro type
import { mapper } from "../../data";

const SingleSlider = ({
  type,
  min,
  max,
  name,
  level,
  sliderData,
  setSliderData,
}) => {
  return (
    <div>
      <div className="slider__title">
        <p>{`${sliderData}${type !== "volume" ? " min" : ""}`}</p>
        <p>{mapper[type]}</p>
      </div>
      <input
        type="range"
        min={min}
        value={sliderData}
        max={max}
        onChange={(e) => {
          if (type === "volume") {
            setSliderData((oldData) => {
              const newData = {
                ...oldData,
                [type]: parseInt(e.target.value),
              };

              return newData;
            });
            return;
          }
          setSliderData(name, parseInt(e.target.value));
        }}
        disabled={!level}
      />
    </div>
  );
};
export default SingleSlider;
