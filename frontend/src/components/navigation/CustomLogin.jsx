import { BiLogOut } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";
import { useLogout } from "../../hooks/useLogout";

const CustomLogin = () => {
  const { logout } = useLogout();
  // // loggout the user
  const logoutUser = () => {
    logout();
  };

  return (
    <div className="absolute nav__login-options">
      <div className="nav__login-options-container">
        <div className="login__options">
          <FaUserEdit />
          <p>My Profile</p>
        </div>
        <div className="login__options" onClick={logoutUser}>
          <BiLogOut />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default CustomLogin;
