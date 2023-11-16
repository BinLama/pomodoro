import { Link, useRouteError } from "react-router-dom";
import Lottie from "lottie-react";
import lamp404animation from "../assets/404.json";

const Error = () => {
  const error = useRouteError();

  // TODO: format the error page better
  if (error.status === 404) {
    return (
      <div className="error">
        <Lottie
          className="lottie"
          animationData={lamp404animation}
          loop={true}
        />
        <Link to="/">
          <p className="btn absolute error__btn">Go Back</p>
        </Link>
      </div>
    );
  }
  return <h1>Error</h1>;
};
export default Error;
