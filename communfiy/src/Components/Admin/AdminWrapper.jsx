import React from 'react';
import AdminLogin from '../../Pages/Admin/AdminLogin';
import AdminHome from '../../Pages/Admin/AdminHome';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AdminWrapper() {
    const isAuthenticated =useSelector((state) => state.authentication_user.isAuthenticated);
      const isAdmin = useSelector(
        (state) => state.authentication_user.isAdmin
      );
    
  return (
    <div>
      <Routes>
      <Route path="" element={<AdminLogin/>}></Route>
      <Route path="home" element={<AdminHome/>}></Route>
      <Route
          path="home"
          element={
            isAuthenticated && isAdmin ? (
              <AdminHome />
            ) : (
              <Navigate to="admin" replace /> // Correct usage of Navigate
            )
          }
        />

      </Routes>
    </div>
  )
}

export default AdminWrapper
