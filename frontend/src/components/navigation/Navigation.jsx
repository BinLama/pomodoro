import { useEffect, useRef, useState } from "react";
import { BiBarChartSquare, BiSliderAlt } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import CustomNavigation from "./CustomNavigation";
import { usePomodoroContext } from "../../hooks/usePomodoroContext";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

const Navigation = () => {
  const { username } = useAuthContext();
  const { logout } = useLogout();

  const settingRef = useRef(null);

  // // loggout the user
  const logoutUser = () => {
    logout();
  };

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
      console.log("Navigation hide");
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
            <div className="nav__setting custom" onClick={setShowOrHideSetting}>
              <BiSliderAlt />
              {width > breakPoint && <p>Customize</p>}
            </div>
            {showSetting && <CustomNavigation />}
          </div>
          {username ? (
            <div className="relative">
              <div className="nav__setting registration" onClick={logoutUser}>
                <FaUserCircle />
                {width > breakPoint && <p>{username}</p>}
              </div>
              {/* TODO: custom logged in menu */}
              {/* TODO: show user setting that can show their, profile, delete their info and showUserSetting && <CustomUser /> */}
            </div>
          ) : (
            <Link className="nav__setting registration" to="/login">
              <FaUserCircle />
              {width > breakPoint && <p>Login</p>}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
export default Navigation;
