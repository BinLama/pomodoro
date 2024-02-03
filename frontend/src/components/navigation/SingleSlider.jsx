// map so that it's easy to convert from slide type to pomodoro type
import { mapper } from "../../data";

const SingleSlider = ({ type, min, max, level, sliderData, setSliderData }) => {
  //   console.log(`slider data: ${sliderData}`);
  //   console.log(`slider type: ${type}`);
  //   console.log(`slider value: ${sliderData}`);
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
          setSliderData((oldData) => {
            const newData = {
              ...oldData,
              [type]: parseInt(e.target.value),
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
