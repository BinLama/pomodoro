import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const [form, setForm] = useState({
    usernameOrEmail: import.meta.env.VITE_LOGIN_NAME || "",
    password: import.meta.env.VITE_LOGIN_PW || "",
  });

  const { login, isLoading, error } = useLogin();

  const handleSignUp = async (e) => {
    // need to send the request to the backend and then use that data to update the global context.
    e.preventDefault();
    console.log("login");
    const { usernameOrEmail, password } = form;
    console.log(usernameOrEmail, password);
    await login(usernameOrEmail, password);
    console.log("REDIRECT");
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSignUp}>
        <div className="">
          <label htmlFor="username">USERNAME or EMAIL ADDRESS</label>
          <input
            type="text"
            name="username"
            id="username"
            value={form.usernameOrEmail}
            onChange={(e) =>
              setForm({ ...form, usernameOrEmail: e.target.value })
            }
            placeholder="Enter your username or email"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Enter your password"
            disabled={isLoading}
          />
        </div>
        <button type="submit" className="btn login__btn" disabled={isLoading}>
          LOGIN
        </button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Login;
