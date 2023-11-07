import { useState } from "react";
import { navigationCustomizationSetting } from "../../data";
import SingleNavigationCusotmization from "./SingleNavigationCusotmization";

const CustomNavigation = () => {
  const [showOptions, setShowOptions] = useState(false);

  const openOptions = () => {
    setShowOptions(true);
  };

  const closeOptions = () => {
    setShowOptions(false);
  };

  return (
    <div className="absolute nav__setting-options">
      {/* remove or add show */}
      <div
        className={
          showOptions
            ? "nav__setting-options-container show"
            : "nav__setting-options-container"
        }
      >
        <div
          className="main__options"
          style={{ height: showOptions ? "0" : "auto" }}
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
        <div className="main__choices">
          <div className="customize__timer">
            <div className="customize__timer-title">
              <p>ICON</p>
              <p>Customize focus level</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomNavigation;
