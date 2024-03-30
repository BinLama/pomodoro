import { Link } from "react-router-dom";
import SignUp from "../components/signup/SignUp";
import { useAuthContext } from "../hooks/useAuthContext";

const SignUpPage = () => {
  const { user } = useAuthContext();

  return (
    <div>
      {user && <Navigate to="/" replace={true} />}
      <nav>pomodoro</nav>
      <h2>Create Your Account</h2>
      <SignUp />
      <Link to="/">Back</Link>
    </div>
  );
};
export default SignUpPage;
