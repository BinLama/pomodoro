import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import CustomLogin from "./CustomLogin";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { usePomodoroContext } from "../../hooks/usePomodoroContext";

const ShowUserLogin = (props) => {
  const { width, breakPoint } = props;

  const { username } = useAuthContext();
  const { setToggleLogin, showLogin } = usePomodoroContext();
  const loginRef = useRef(null);
  // const [showLogin, setShowLogin] = useState(false);

  // const setToggleLogin = () => {
  //   setShowLogin(!showLogin);
  // };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showLogin &&
        loginRef.current &&
        !loginRef.current.contains(e.target)
      ) {
        setToggleLogin();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showLogin]);

  if (username) {
    return (
      <div className="relative" ref={loginRef}>
        <div className="nav__setting registration" onClick={setToggleLogin}>
          <FaUserCircle />
          {width > breakPoint && <p>{username}</p>}
        </div>
        {showLogin && <CustomLogin />}
      </div>
    );
  }

  return (
    <Link className="nav__setting registration" to="/login">
      <FaUserCircle />
      {width > breakPoint && <p>Login</p>}
    </Link>
  );
};

export default ShowUserLogin;
