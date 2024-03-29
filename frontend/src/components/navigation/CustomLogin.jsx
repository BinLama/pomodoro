import { BiLogOut } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";

const CustomLogin = () => {
  return (
    <div className="absolute">
      <div className="">
        <FaUserEdit />
        <p>My Profile</p>
      </div>
      <div className="">
        <BiLogOut />
        <p>Logout</p>
      </div>
    </div>
  );
};

export default CustomLogin;
