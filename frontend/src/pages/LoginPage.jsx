import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Login from "../components/login/Login";
import LoginSeperator from "../components/login/LoginSeperator";
import Oauth from "../components/login/Oauth";
import { Logo } from "../components/utils";

const LoginPage = () => {
  const { username } = useAuthContext();

  if (username) {
    return <Navigate to="/" replace={true} />;
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
