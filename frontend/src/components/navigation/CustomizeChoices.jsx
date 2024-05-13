import { IoArrowBackOutline } from "react-icons/io5";
import CustomizeTimerOptions from "./custom/Timer/CustomizeTimerOptions";
import { customAlarm, customFocusLevel } from "../../data";
import CustomizeAlarmOptions from "./custom/Alarm/CustomizeAlarmOptions";
import CustomAutoStart from "./custom/Auto/CustomAutoStart";
import CustomSession from "./custom/session/CustomSession";

const CustomizeChoices = ({ closeOptions }) => {
  return (
    <div className="main__choices">
      {/* Customize Timer */}
      <div className="customize__timer">
        <div className="customize-title">
          <div className="arrow" onClick={closeOptions}>
            <IoArrowBackOutline />
          </div>
          <p>{customFocusLevel.title}</p>
        </div>
        <div className="customize__timer-options ">
          {customFocusLevel.choices.map((level) => {
            return <CustomizeTimerOptions key={level.id} {...level} />;
          })}
        </div>
      </div>
      {/* Customize Timer End */}
      {/* Customize Alarm */}
      <div className="customize__alarm">
        <div className="customize-title">
          <div className="arrow" onClick={closeOptions}>
            <IoArrowBackOutline />
          </div>
          <p>{customAlarm.title}</p>
        </div>
        <CustomizeAlarmOptions />
      </div>
      {/* Customize Alarm End */}
      {/* Customize auto start */}
      <div className="auto__start">
        <div className="customize-title">
          <div className="arrow" onClick={closeOptions}>
            <IoArrowBackOutline />
          </div>
          <p>Auto Start</p>
        </div>
        <CustomAutoStart />
      </div>
      {/* Customize auto start end */}
      {/* Customize auto start */}
      <div className="custom__session">
        <div className="customize-title">
          <div className="arrow" onClick={closeOptions}>
            <IoArrowBackOutline />
          </div>
          <p>Custom Session</p>
        </div>
        <CustomSession />
      </div>
      {/* Customize auto start end */}
    </div>
  );
};
export default CustomizeChoices;
