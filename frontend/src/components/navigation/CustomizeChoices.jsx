import { IoArrowBackOutline } from "react-icons/io5";
import CustomizeTimerOptions from "./custom/Timer/CustomizeTimerOptions";
import { customFocusLevel } from "../../data";

const CustomizeChoices = ({ closeOptions }) => {
  return (
    <div className="main__choices">
      {/* Customize Timer */}
      <div className="customize__timer">
        <div className="customize__timer-title">
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
        <div className="customize__timer-title">
          <div className="arrow" onClick={closeOptions}>
            <IoArrowBackOutline />
          </div>
          <p>{customFocusLevel.title}</p>
        </div>
        <div className="">
          <p>ALA</p>
        </div>
      </div>
      {/* Customize Alarm End */}
    </div>
  );
};
export default CustomizeChoices;
