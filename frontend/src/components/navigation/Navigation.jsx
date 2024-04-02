import { useEffect, useRef, useState } from "react";
import { BiBarChartSquare, BiSliderAlt } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import CustomNavigation from "./CustomNavigation";
import { usePomodoroContext } from "../../hooks/usePomodoroContext";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

const Navigation = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const settingRef = useRef(null);

  // loggout the user
  const logoutUser = () => {
    logout();
  };

  // show the letters on large screen
  const [width, setWidth] = useState(window.innerWidth);
  const breakPoint = 900;

  const { showSetting, showOrHideSetting, hideSetting } = usePomodoroContext();

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
      if (settingRef.current && !settingRef.current.contains(e.target)) {
        hideSetting();
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <header className="header">
      <div className="nav">
        <Link to="/">
          <h1 className="nav-h1">Pomodoro</h1>
        </Link>
        <nav className="nav__container" style={{ zIndex: showSetting ? 2 : 0 }}>
          <Link
            className="nav__setting report"
            onClick={() => {
              alert("reports will be coming in the next patch :)");
            }}
            to="/report"
          >
            <BiBarChartSquare />
            {width > breakPoint && <p>Report</p>}
          </Link>
          <div className="relative" ref={settingRef}>
            <div className="nav__setting custom" onClick={showOrHideSetting}>
              <BiSliderAlt />
              {width > breakPoint && <p>Customize</p>}
            </div>
            {showSetting && <CustomNavigation />}
          </div>
          {user ? (
            <div className="nav__setting registration" onClick={logoutUser}>
              <FaUserCircle />
              {width > breakPoint && <p>{user}</p>}
            </div>
          ) : (
            <Link
              className="nav__setting registration"
              to="/login"
              // onClick={() => {
              //   alert(
              //     "server is not connected at the moment. It will be coming in the next patch :)"
              //   );
              // }}
            >
              <FaUserCircle />
              {width > breakPoint && <p>Login</p>}
            </Link>
          )}
          {/* TODO: show user setting that can show their, profile, delete their info and showUserSetting && <CustomUser /> */}
        </nav>
      </div>
    </header>
  );
};
export default Navigation;
