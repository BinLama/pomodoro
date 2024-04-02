import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

const SignUp = () => {
  const [values, setValues] = useState({
    fName: "",
    lName: "",
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

    const { fName, lName, username, email, password } = values;
    console.log(fName);
    console.log(signup, isLoading, error);
    await signup(fName, lName, username, email, password);
    console.log("sign up");
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div className="signup">
      <form className="signup__form" onSubmit={handleSignUp}>
        <div className="signup__form--div">
          <label htmlFor="fName">First Name</label>
          <input
            type="text"
            name="fName"
            id="fName"
            value={values.fName}
            onChange={handleChange("fName")}
            placeholder="First Name"
          />
          <div className="line__overlay">
            <div className="line__fake"></div>
            <div className="line"></div>
          </div>
        </div>

        <div className="signup__form--div">
          <label htmlFor="lName">Last Name</label>
          <input
            type="text"
            name="lName"
            id="lName"
            value={values.lName}
            onChange={handleChange("lName")}
            placeholder="Last Name"
          />
          <div className="line__overlay">
            <div className="line__fake"></div>
            <div className="line"></div>
          </div>
        </div>

        <div className="signup__form--div">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={values.username}
            onChange={handleChange("username")}
            placeholder="username"
          />
          <div className="line__overlay">
            <div className="line__fake"></div>
            <div className="line"></div>
          </div>
        </div>

        <div className="signup__form--div">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange("email")}
            placeholder="name@example.com"
          />
          <div className="line__overlay">
            <div className="line__fake"></div>
            <div className="line"></div>
          </div>
        </div>

        <div className="signup__form--div">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange("password")}
            placeholder="Password"
          />
          <div className="line__overlay">
            <div className="line__fake"></div>
            <div className="line"></div>
          </div>
        </div>

        <div className="signup__form--div">
          <label htmlFor="confirmPW">confirm password</label>
          <input
            type="password"
            name="confirmPW"
            id="confirmPW"
            value={values.confirmPW}
            onChange={handleChange("confirmPW")}
            placeholder="Password"
          />
          <div className="line__overlay">
            <div className="line__fake"></div>
            <div className="line"></div>
          </div>
        </div>

        <div className="termsAndService">
          <p>
            By creating this account, you agree to our &nbsp;
            <span>Terms of Service</span> and have read and understood the
            &nbsp;<span>Privacy Policy</span>
          </p>
        </div>

        <button type="submit" className="btn signup__form--button">
          Sign up
        </button>
      </form>

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default SignUp;
