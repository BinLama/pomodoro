import { useEffect, useState } from "react";
import { usePomodoroContext } from "../../../../hooks/usePomodoroContext";
import SingleSlider from "../../SingleSlider";
import SingleAudio from "./SingleAudio";
import { customAlarm } from "../../../../data";
import { BiSolidVolumeMute } from "react-icons/bi";

const CustomizeAlarmOptions = () => {
  const { setMute, mute, volume, setVolume } = usePomodoroContext();
  const [sliderData, setSliderData] = useState({
    volume: volume,
  });

  useEffect(() => {
    setVolume(sliderData.volume);
    console.log("changed Volume");
  }, [sliderData]);

  return (
    <div className="customize__alarm-options">
      <div className="audio__selection">
        {customAlarm.choices.map((alarm) => {
          return <SingleAudio key={alarm.id} {...alarm} />;
        })}
        <div
          className="audio__selection-div mute"
          onClick={() => setMute(true)}
        >
          <BiSolidVolumeMute />
        </div>
      </div>
      <div className="slider">
        <SingleSlider
          type="volume"
          min={0}
          max={100}
          sliderData={sliderData}
          setSliderData={setSliderData}
          level={!mute}
        />
        {/* <input type="range" name="sound" id="sound" min={1} max={100} /> */}
      </div>
    </div>
  );
};
export default CustomizeAlarmOptions;
