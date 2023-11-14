import { useState } from "react";
import { navigationCustomizationSetting } from "../../data";
import SingleNavigationCusotmization from "./SingleNavigationCusotmization";
import CustomizeChoices from "./CustomizeChoices";
import { usePomodoroContext } from "../../hooks/usePomodoroContext";

const DEFAULT = {
  show: false,
  type: "",
};

const CustomNavigation = () => {
  const { skipToBreak, skipToPomo } = usePomodoroContext();
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
          <p className="options" onClick={skipToBreak}>
            Skip to break
          </p>
          <p className="options" onClick={skipToPomo}>
            Skip to Pomodoro
          </p>
        </div>
        <CustomizeChoices closeOptions={closeOptions} />
      </div>
    </div>
  );
};
export default CustomNavigation;
