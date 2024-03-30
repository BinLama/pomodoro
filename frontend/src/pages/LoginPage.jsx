import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Login from "../components/Login";
import LoginSeperator from "../components/LoginSeperator";
import Oauth from "../components/Oauth";

const LoginPage = () => {
  // const [form, setForm] = useState({
  //   usernameOrEmail: import.meta.env.VITE_LOGIN_NAME || "",
  //   password: import.meta.env.VITE_LOGIN_PW || "",
  // });

  const { user } = useAuthContext();

  // const { login, isLoading, error } = useLogin();

  // const handleSignUp = async (e) => {
  //   // need to send the request to the backend and then use that data to update the global context.
  //   e.preventDefault();
  //   console.log("login");
  //   const { usernameOrEmail, password } = form;
  //   console.log(usernameOrEmail, password);
  //   await login(usernameOrEmail, password);
  //   console.log("REDIRECT");
  // };

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
