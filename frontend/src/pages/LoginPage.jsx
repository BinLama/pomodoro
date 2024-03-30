import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Login from "../components/login/Login";
import LoginSeperator from "../components/login/LoginSeperator";
import Oauth from "../components/login/Oauth";

const LoginPage = () => {
  const { user } = useAuthContext();

  return (
    <div>
      {user && <Navigate to="/" replace={true} />}
      <nav>pomodoro</nav>
      <h2>Log into Pomodoro</h2>
      <Login />
      <div className="signup">
        <p className="signup__p">Don't have an account?</p>
        <Link to="/signup">SIGN UP</Link>
      </div>
      <LoginSeperator />
      <Oauth />
      <Link className="reset__password" to="/resetpassword">
        CAN'T LOG IN?
      </Link>
    </div>
  );
};

export default LoginPage;
