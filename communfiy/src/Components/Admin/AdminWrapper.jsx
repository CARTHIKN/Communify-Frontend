import React from 'react';
import AdminLogin from '../../Pages/Admin/AdminLogin';
import AdminHome from '../../Pages/Admin/AdminHome';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminPrivateRoute from '../PrivateRoutes/AdminPrivateRoute';

function AdminWrapper() {
    const isAuthenticated =useSelector((state) => state.authentication_user.isAuthenticated);
      const isAdmin = useSelector(
        (state) => state.authentication_user.isAdmin
      );
    
  return (
    <div>
      <Routes>
      <Route path="" element={<AdminLogin/>}></Route>

      <Route path="home" element= { <AdminPrivateRoute><AdminHome/></AdminPrivateRoute> }></Route>
      

      </Routes>
    </div>
  )
}

export default AdminWrapper
