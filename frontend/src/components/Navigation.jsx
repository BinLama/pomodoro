import { BiBarChartSquare, BiSliderAlt } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
// import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <header>
      <div className="">
        <h1 className="">Pomodoro</h1>
        <nav className="">
          <div className="">
            <BiBarChartSquare />
            <p>Report</p>
          </div>
          <div className="">
            <BiSliderAlt />
            <p>Customize</p>
          </div>
          <div className="">
            <FaUserCircle />
            <p>Login</p>
          </div>
        </nav>
      </div>
    </header>
  );
};
export default Navigation;
