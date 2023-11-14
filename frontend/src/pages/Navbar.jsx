import { Outlet } from "react-router-dom";
import Navigation from "../components/navigation/Navigation";

import { usePomodoroContext } from "../hooks/usePomodoroContext";

const Navbar = () => {
  const { showSetting, showOrHideSetting } = usePomodoroContext();
  return (
    <>
      <Navigation />
      {showSetting && (
        <div className="overlay absolute" onClick={showOrHideSetting}></div>
      )}
      <Outlet />
    </>
  );
};
export default Navbar;
