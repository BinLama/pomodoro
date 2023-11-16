import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const SignUp = () => {
  const [form, setForm] = useState({
    f_name: "",
    l_name: "",
    username: "",
    email: "",
    password: "",
    confirmPW: "",
  });

  const { signup, isLoading, error } = useSignup();

  const handleSignUp = async (e) => {
    // need to send the request to the backend and then use that data to update the global context.
    e.preventDefault();
    console.log("going to sign up");

    const { f_name, l_name, username, email, password } = form;
    console.log(f_name);
    console.log(signup, isLoading, error);
    await signup(f_name, l_name, username, email, password);
    console.log("sign up");
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <form className="signup" onSubmit={handleSignUp}>
        <h3>Sign up</h3>
        <label htmlFor="f_name">First Name</label>
        <input
          type="text"
          name="f_name"
          id="f_name"
          value={form.f_name}
          onChange={(e) => setForm({ ...form, f_name: e.target.value })}
        />
        <label htmlFor="l_name">Last Name</label>
        <input
          type="text"
          name="l_name"
          id="l_name"
          value={form.l_name}
          onChange={(e) => setForm({ ...form, l_name: e.target.value })}
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <label htmlFor="password">confirm password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={form.confirmPW}
          onChange={(e) => setForm({ ...form, confirmPW: e.target.value })}
        />
        <button type="submit">Sign up</button>
      </form>

      {error && <div className="error">{error}</div>}
    </>
  );
};
export default SignUp;
