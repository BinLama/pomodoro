import { useEffect, useState } from "react";
import { usePomodoroContext } from "../../../../hooks/usePomodoroContext";
import SingleSlider from "../../SingleSlider";
import SingleAudio from "./SingleAudio";
import { customAlarm } from "../../../../data";
import { BiSolidVolumeFull, BiSolidVolumeMute } from "react-icons/bi";

const CustomizeAlarmOptions = () => {
  const { toggleMute, mute, volume, handleVolumeChange } = usePomodoroContext();
  const [sliderData, setSliderData] = useState({
    volume: volume,
  });

  useEffect(() => {
    if (volume === sliderData.volume) return;
    handleVolumeChange(sliderData.volume);
    console.log("changed Volume");
  }, [sliderData]);

  return (
    <div className="customize__alarm-options">
      <div className="audio__selection">
        {customAlarm.choices.map((alarm) => {
          return <SingleAudio key={alarm.id} {...alarm} />;
        })}
        <div
          className={
            mute
              ? "audio__selection-div mute selected"
              : "audio__selection-div mute"
          }
          onClick={toggleMute}
        >
          {!mute ? <BiSolidVolumeMute /> : <BiSolidVolumeFull />}
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
      </div>
    </div>
  );
};
export default CustomizeAlarmOptions;
