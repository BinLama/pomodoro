import { FcGoogle } from "react-icons/fc";

const Oauth = () => {
  return (
    <div className="oauth">
      <button className="btn oauth__google">
        <FcGoogle />
        <p>Continue with Google</p>
      </button>
      <button className="btn oauth__guest">Continue as Guest</button>
    </div>
  );
};

export default Oauth;
