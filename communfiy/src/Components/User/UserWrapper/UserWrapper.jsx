import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLogin from "../../../Pages/User/UserLogin";
import UserRegister from "../../../Pages/User/UserRegister";
import Registration_Otp from "../../../Pages/User/Registration_Otp";
import Test from "../../../Pages/User/Test";
import ForgotPasswrod from "../../../Pages/User/ForgotPasswrod";
import ChangePassword from "../../../Pages/User/ChangePassword";
import Test2 from "../../../Pages/User/Test2";
import Home from "../../../Pages/HomePage/Home";
import PrivateRoute from "../../PrivateRouter";
import UserProfile from "../../../Pages/UserProfile/UserProfile";
import ProfileEdit from "../../../Pages/UserProfile/ProfileEdit";
import SecondPrivateRoute from "../../SecondPrivateRouter";

function UserWrapper() {
  return (
    <div>
     
      <Routes>
        
        <Route path="/" element={<UserLogin/>}></Route>
        <Route path="register" element={<UserRegister />}></Route>
        <Route path="otp" element={<Registration_Otp />}></Route>
        <Route path="test" element={<Test/>}></Route>
        <Route path="test2" element={<Test2/>}></Route>
        <Route path="forgot-password" element={<ForgotPasswrod/>}></Route>
        <Route path="change-password" element={<ChangePassword/>}></Route>
        

        <Route path="home" element={<PrivateRoute><Home/></PrivateRoute>}></Route>
        <Route path="user-profile" element={<PrivateRoute><UserProfile/></PrivateRoute>}></Route>
        <Route path="user-profile-edit" element={<PrivateRoute><ProfileEdit/></PrivateRoute>}></Route>



      </Routes>
    </div>
  );
}

export default UserWrapper;
