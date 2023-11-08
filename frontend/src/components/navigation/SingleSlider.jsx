// map so that it's easy to convert from slide type to pomodoro type
const mapper = {
  "long break": "longBreak",
  break: "shortBreak",
  pomodoro: "pomodoro",
};

const SingleSlider = ({ type, min, max, level, sliderData, setSliderData }) => {
  return (
    <div>
      <div className="slider__title">
        <p>{`${sliderData[mapper[type]]} min`}</p>
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
