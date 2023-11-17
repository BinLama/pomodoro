import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Login = () => {
  const [form, setForm] = useState({
    usernameOrEmail: import.meta.env.VITE_LOGIN_NAME || "",
    password: import.meta.env.VITE_LOGIN_PW || "",
  });

  const { user } = useAuthContext();

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
    <div>
      {user && <Navigate to="/" replace={true} />}
      <form className="signup" onSubmit={handleSignUp}>
        <h3>Login</h3>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={form.usernameOrEmail}
          onChange={(e) =>
            setForm({ ...form, usernameOrEmail: e.target.value })
          }
          disabled={isLoading}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="btn"
          style={{ paddingInline: `15px` }}
          disabled={isLoading}
        >
          Log in
        </button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};
export default Login;
