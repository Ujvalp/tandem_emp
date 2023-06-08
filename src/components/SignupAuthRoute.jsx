import { useAuth } from "../context/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const SignupAuthRoute = () => {
  const { email, validateEmail} = useAuth();
  const location = useLocation();
  // console.log(user);

  return email && validateEmail ? (
    <>
      
      <Outlet />
      
    </>
  ) : (
    <Navigate to={"/email-validation"} replace state={{ path: location.pathname }} />
  );
}
export default SignupAuthRoute;




// return user && user.user_metadata.name ? (
//   <Outlet />
// ) : (
//   <Navigate to={"/login"} replace state={{ path: location.pathname }} />
// );