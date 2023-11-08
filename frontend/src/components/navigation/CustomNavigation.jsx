import { useState } from "react";
import { navigationCustomizationSetting } from "../../data";
import SingleNavigationCusotmization from "./SingleNavigationCusotmization";
import CustomizeChoices from "./CustomizeChoices";

const DEFAULT = {
  show: false,
  type: "",
};

const CustomNavigation = () => {
  const [showOptions, setShowOptions] = useState(DEFAULT);

  const openOptions = (type) => {
    setShowOptions(() => {
      const option = { show: true, ...type };
      return option;
    });
  };

  const closeOptions = () => {
    setShowOptions(DEFAULT);
  };

  return (
    <div className="absolute nav__setting-options">
      <div
        className={
          showOptions.show
            ? `nav__setting-options-container ${showOptions.type} `
            : "nav__setting-options-container"
        }
      >
        <div
          className="main__options"
          style={{ height: showOptions.show ? "0" : "auto" }}
        >
          {navigationCustomizationSetting.map((setting) => {
            return (
              <SingleNavigationCusotmization
                key={setting.id}
                {...setting}
                openOptions={openOptions}
                closeOptions={closeOptions}
              />
            );
          })}
          <hr />
          <p className="options">Skip to break</p>
          <p className="options">Skip to Pomodoro</p>
        </div>
        <CustomizeChoices closeOptions={closeOptions} />
        {/* <div className="main__choices">
          <div className="customize__timer">
            <div className="customize__timer-title">
              <IoArrowBackOutline />
              <p>Customize focus level</p>
            </div>
            <div className="customize__timer-options">
              <div className="customize__timer-options__input">
                <input type="radio" value="" id="beginner" />
                <label htmlFor="beginner">
                  <span className="">Beginner</span>
                  <span>10 min &#xb7; 5 min &#xb7; 10 min</span>
                </label>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};
export default CustomNavigation;
