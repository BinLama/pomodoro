import { BiLogOut } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";
import { useLogout } from "../../hooks/useLogout";
import { Link } from "react-router-dom";

const CustomLogin = () => {
  const { logout } = useLogout();

  // loggout the user
  const logoutUser = () => {
    logout();
  };

  return (
    <div className="absolute nav__login-options">
      <div className="nav__login-options-container">
        <Link className="login__options" to="/profile">
          <FaUserEdit />
          <p>My Profile</p>
        </Link>
        <div className="login__options" onClick={logoutUser}>
          <BiLogOut />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default CustomLogin;
