import { Outlet } from "react-router-dom";
import Navigation from "../components/navigation/Navigation";

const Navbar = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};
export default Navbar;
