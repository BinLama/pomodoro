import { navigationCustomizationSetting } from "../../data";
import SingleNavigationCusotmization from "./SingleNavigationCusotmization";

const CustomNavigation = () => {
  return (
    <div className="absolute nav__setting-options">
      <div className="main__options">
        {navigationCustomizationSetting.map((setting) => {
          return (
            <SingleNavigationCusotmization key={setting.id} {...setting} />
          );
        })}
        <hr />

        {/*   <div className="options">
                  <div className="options-title">
                    <BiSolidTimeFive />
                    <p>Focus level</p>
                  </div>
                  <div className="button">
                    <BiChevronRight />
                  </div>
                </div>
        */}
        <p className="options">Skip to break</p>
        <p className="options">Skip to Pomodoro</p>
      </div>
      <div className="main__choices">
        <div className="customize-timer"></div>
      </div>
    </div>
  );
};
export default CustomNavigation;
