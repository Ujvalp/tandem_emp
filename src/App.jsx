import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import AuthRoute from "./components/AuthRoute";
import Products from "./Pages/Products";
import Product_Detail from "./Pages/Product_Detail";
import Saved from "./Pages/Saved";
import Search_Results from "./Pages/Search_Results";
import Profile from "./Pages/Profile";
import SignUp_Form from "./Pages/SignUp_Form";
import Email_validation from "./Pages/Email_validation";
import { Weekly_Reward } from "./Pages/Weekly_Reward";
import Login_Store from "./Pages/Login_Store";
import Code_Verify from "./Pages/Code_Verify";
import SignupAuthRoute from './components/SignupAuthRoute'
import Store_Validation from "./Pages/Store_validation";
import StoreAuthRoute from "./components/StoreAuthRout";


function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="products/:cateName/:catId" element={<Products />} />
          <Route path="code-verification" element={<Code_Verify />} />
          <Route path="saved" element={<Saved />} />
          <Route path="searchresult" element={<Search_Results />} />
          <Route path="weekly-reward" element={<Weekly_Reward />} />
          <Route path="/details/:offerId" element={<Product_Detail />} />
        </Route>
        
        <Route element={<SignupAuthRoute/>}>
        <Route path="signup" element={<SignUp_Form />} />
        </Route>
        
        <Route element={<StoreAuthRoute />}>
        <Route path="store-login" element={<Login_Store />} />
        </Route>
        
        <Route path="login" element={<Login />} />
        <Route path="email-validation" element={<Email_validation />} />
        <Route path="/storevalidation" element={<Store_Validation />} />
      </Routes>
    </>
  );
}

export default App;
