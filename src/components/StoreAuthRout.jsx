import { useAuth } from "../context/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const StoreAuthRoute = () => {
  const {phone,validatePhone} = useAuth();
  const location = useLocation();
  // console.log(user);

  return phone && validatePhone ? (
    <>
      
      <Outlet />
      
    </>
  ) : (
    <Navigate to={"/storevalidation"} replace state={{ path: location.pathname }} />
  );
}
export default StoreAuthRoute;




// return user && user.user_metadata.name ? (
//   <Outlet />
// ) : (
//   <Navigate to={"/login"} replace state={{ path: location.pathname }} />
// );StoreAuthRoute