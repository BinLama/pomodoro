import { Link } from "react-router-dom";
import SignUp from "../components/signup/SignUp";
import { useAuthContext } from "../hooks/useAuthContext";
import { Logo } from "../components/utils";

const SignUpPage = () => {
  const { user } = useAuthContext();

  if (user) {
    <Navigate to="/" replace={true} />;
  }

  return (
    <div className="signuppage">
      <Logo />
      <h2>Create Your Account</h2>
      <SignUp />
      <Link to="/">Back</Link>
    </div>
  );
};
export default SignUpPage;
