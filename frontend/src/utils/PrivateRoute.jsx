import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const PrivateRoute = ({ children }) => {
  const { username } = useAuthContext();

  return username ? <>{children}</> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
