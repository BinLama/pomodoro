import { useEffect, useRef, useState } from "react";
import { BiBarChartSquare, BiSliderAlt } from "react-icons/bi";
import CustomNavigation from "./CustomNavigation";
import { usePomodoroContext } from "../../hooks/usePomodoroContext";
import { Link } from "react-router-dom";
import ShowUserLogin from "./ShowUserLogin";
import { useAuthContext } from "../../hooks/useAuthContext";

const Navigation = () => {
  // ref
  const settingRef = useRef(null);
  const { id } = useAuthContext();

  // show the letters on large screen
  const [width, setWidth] = useState(window.innerWidth);
  const breakPoint = 900;

  const { showSetting, setShowOrHideSetting, setHideSetting } =
    usePomodoroContext();

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      // unsubscribe
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showSetting &&
        settingRef.current &&
        !settingRef.current.contains(e.target)
      ) {
        setHideSetting();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showSetting]);

  return (
    <header className="header">
      <div className="nav">
        <Link to="/">
          <h1 className="nav-h1">Pomodoro</h1>
        </Link>
        <nav className="nav__container" style={{ zIndex: showSetting ? 2 : 0 }}>
          <Link className="nav__setting report" to={`/report/${id}`}>
            <BiBarChartSquare />
            {width > breakPoint && <p>Report</p>}
          </Link>
          <div className="relative" ref={settingRef}>
            <div className="nav__setting custom" onClick={setShowOrHideSetting}>
              <BiSliderAlt />
              {width > breakPoint && <p>Customize</p>}
            </div>
            {showSetting && <CustomNavigation />}
          </div>
          <ShowUserLogin width={width} breakPoint={breakPoint} />
        </nav>
      </div>
    </header>
  );
};
export default Navigation;
