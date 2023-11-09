// map so that it's easy to convert from slide type to pomodoro type
import { mapper } from "../../data";

const SingleSlider = ({ type, min, max, level, sliderData, setSliderData }) => {
  return (
    <div>
      <div className="slider__title">
        <p>{`${sliderData[mapper[type]]}${type !== "volume" ? " min" : ""}`}</p>
        <p>{type}</p>
      </div>
      <input
        type="range"
        min={min}
        value={sliderData[mapper[type]]}
        max={max}
        onChange={(e) => {
          setSliderData((oldData) => {
            const newData = {
              ...oldData,
              [mapper[type]]: parseInt(e.target.value),
            };
            return newData;
          });
        }}
        disabled={!level}
      />
    </div>
  );
};
export default SingleSlider;
