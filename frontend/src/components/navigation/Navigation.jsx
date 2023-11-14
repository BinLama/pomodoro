import { useEffect, useState } from "react";
import { BiBarChartSquare, BiSliderAlt } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import CustomNavigation from "./CustomNavigation";
import { usePomodoroContext } from "../../hooks/usePomodoroContext";
// import { Link } from "react-router-dom";

const Navigation = () => {
  // TODO: show the letters on large screen
  const [width, setWidth] = useState(window.innerWidth);
  const breakPoint = 900;

  const { showSetting, showOrHideSetting } = usePomodoroContext();

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);
  return (
    <header className="header">
      <div className="nav">
        <h1 className="nav-h1">Pomodoro</h1>
        <nav className="nav__container" style={{ zIndex: showSetting ? 2 : 0 }}>
          <div
            className="nav__setting report"
            onClick={() => {
              alert("reports will be coming in the next patch :)");
            }}
          >
            <BiBarChartSquare />
            {width > breakPoint && <p>Report</p>}
          </div>
          <div className="relative">
            <div className="nav__setting custom" onClick={showOrHideSetting}>
              <BiSliderAlt />
              {width > breakPoint && <p>Customize</p>}
            </div>
            {showSetting && <CustomNavigation />}
          </div>
          <div className="nav__setting login">
            <FaUserCircle />
            {width > breakPoint && <p>Login</p>}
          </div>
        </nav>
      </div>
    </header>
  );
};
export default Navigation;
