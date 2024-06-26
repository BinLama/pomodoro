import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { Link } from "react-router-dom";
import { Line, PasswordInput } from "../utils";

const Login = () => {
  const [values, setValues] = useState({
    usernameOrEmail: import.meta.env.VITE_LOGIN_NAME || "",
    password: import.meta.env.VITE_LOGIN_PW || "",
  });

  const { login, isLoading, error } = useLogin();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { usernameOrEmail, password } = values;
    await login(usernameOrEmail, password);
  };

  return (
    <section className="login">
      <form className="login__form" onSubmit={handleSignUp}>
        <div className="login__form--div">
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            name="username"
            id="username"
            value={values.usernameOrEmail}
            onChange={handleChange("usernameOrEmail")}
            placeholder="Type your username or email"
            disabled={isLoading}
          />
          <Line />
        </div>
        <PasswordInput
          values={values}
          classes={"login__form--div"}
          handleChange={handleChange}
          isLoading={isLoading}
          name="password"
        />
        <div className="login__trouble">
          <Link className="reset__password" to="/resetpassword">
            CAN'T LOG IN?
          </Link>
        </div>
        <button type="submit" className="btn login__btn" disabled={isLoading}>
          login
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      {/* TODO: use toast to show the error */}
    </section>
  );
};

export default Login;
