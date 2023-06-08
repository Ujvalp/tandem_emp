import { useAuth } from "../context/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const AuthRoute = () => {
  const { user } = useAuth();
  const location = useLocation();
  // console.log(user);

  return user ? (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  ) : (
    <Navigate to={"/login"} replace state={{ path: location.pathname }} />
  );
}
export default AuthRoute;




// return user && user.user_metadata.name ? (
//   <Outlet />
// ) : (
//   <Navigate to={"/login"} replace state={{ path: location.pathname }} />
// );