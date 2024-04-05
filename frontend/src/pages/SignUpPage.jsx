import { Link } from "react-router-dom";
import SignUp from "../components/signup/SignUp";
import { useAuthContext } from "../hooks/useAuthContext";
import { Logo } from "../components/utils";

const SignUpPage = () => {
  const { username } = useAuthContext();

  if (username) {
    <Navigate to="/" replace={true} />;
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
