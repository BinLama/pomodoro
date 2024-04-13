import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Login from "../components/login/Login";
import LoginSeperator from "../components/login/LoginSeperator";
import Oauth from "../components/login/Oauth";
import { Logo } from "../components/utils";

const LoginPage = () => {
  const { username } = useAuthContext();
  const location = useLocation();

  const { from } = location.state || {
    from: {
      pathname: "/",
    },
  };

  if (username) {
    return <Navigate to={from} replace={true} />;
  }

  return (
    <div className="loginpage">
      <div className="loginpage__container">
        <Logo />
        <h2>Log into Pomodoro</h2>
        <div className="loginpage__container--div">
          <div className="loginpage__container--login">
            <Login />
            <div className="signup__link">
              <p className="signup__link--p">Don't have an account?</p>
              <Link to="/signup">SIGN UP</Link>
            </div>
          </div>
          <LoginSeperator />
          <Oauth />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
