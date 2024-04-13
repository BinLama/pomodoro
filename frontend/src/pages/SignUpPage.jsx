import { Link, useLocation } from "react-router-dom";
import SignUp from "../components/signup/SignUp";
import { useAuthContext } from "../hooks/useAuthContext";
import { Logo } from "../components/utils";

const SignUpPage = () => {
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
    <div className="signuppage">
      <div className="signuppage__container">
        <Logo />
        <div className="signuppage__container--div">
          <h2>Create Your Account</h2>
          <SignUp />
          <Link className="btn" to="/">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
