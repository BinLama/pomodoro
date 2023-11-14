import { useState } from "react";

const SignUp = () => {
  const [info, setInfo] = useState({
    f_name: "",
    l_name: "",
    username: "",
    email: "",
    password: "",
  });
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    // need to send the request to the backend and then use that data to update the global context.
    e.preventDefault();
    console.log("sing up");
  };
  return (
    <form className="signup" onSubmit={handleSignUp}>
      <h3>Sign up</h3>
      <label htmlFor="f_name">First Name</label>
      <input type="text" name="f_name" id="f_name" onChange={(e) => set} />
      <label htmlFor="l_name">Last Name</label>
      <input type="text" name="l_name" id="l_name" />
      <label>Email:</label>
      <button type="submit">Sign up</button>
    </form>
  );
};
export default SignUp;
