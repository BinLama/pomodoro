import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Oauth = () => {
  const navigate = useNavigate();

  const continueAsGuestClick = () => {
    navigate("/");
  };

  return (
    <div className="oauth">
      <button className="btn oauth__google">
        <FcGoogle />
        <p>Continue with Google</p>
      </button>
      <button className="btn oauth__guest" onClick={continueAsGuestClick}>
        Continue as Guest
      </button>
    </div>
  );
};

export default Oauth;
