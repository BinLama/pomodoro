import { useState } from "react";
import { BiBarChartSquare, BiSliderAlt } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import CustomNavigation from "./CustomNavigation";
// import { Link } from "react-router-dom";

const Navigation = () => {
  // TODO: show the letters on large screen
  const [largeScreen, setLargeScreen] = useState(false); // used for showing the paragraphs for large screen.

  const [showSetting, setShowSetting] = useState(false);

  const showOrHideSetting = () => {
    setShowSetting((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="nav">
        <h1 className="nav-h1">Pomodoro</h1>
        <nav className="nav__container">
          <div className="nav__setting report">
            <BiBarChartSquare />
            {largeScreen && <p>Report</p>}
          </div>
          <div className="relative">
            <div className="nav__setting custom" onClick={showOrHideSetting}>
              <BiSliderAlt />
              {largeScreen && <p>Customize</p>}
            </div>
            {showSetting && <CustomNavigation />}
          </div>
          <div className="nav__setting login">
            <FaUserCircle />
            {largeScreen && <p>Login</p>}
          </div>
        </nav>
      </div>
    </header>
  );
};
export default Navigation;
