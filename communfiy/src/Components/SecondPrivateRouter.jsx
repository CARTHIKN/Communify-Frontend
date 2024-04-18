import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import isAuthUser from'../utils/isAuthUser'
import { useDispatch } from 'react-redux';
import { set_Authentication } from '../Redux/authentication/authenticationSlice';
import { set_user_basic_details } from '../Redux/userBasicDetials/userBasicDetailsSlice';
import { useSelector } from 'react-redux';


function SecondPrivateRoute({ children }) {

  const dispatch = useDispatch()
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setLoading] = useState(true);
  
  

  useEffect(() => {
    const fetchData = async () => {
      const authInfo = await isAuthUser();
      dispatch(
        set_Authentication({
          username: authInfo.username,
          isAuthenticated: true,
          isAdmin: authInfo.isAdmin,
        })
        
      );
      console.log(authInfo.isAdmin)


      console.log(authInfo.username)
      setIsAuthenticated(authInfo.isAuthenticated);
      setIsAdmin(authInfo.isAdmin)
      
      
      setLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    // Handle loading state, you might show a loading spinner
    return <div>Loading...</div>;
  }

  if (isAuthenticated ) {
    // If not authenticated, redirect to login page with the return URL
    return <Navigate to="/home" />;
  }  

  if (isAdmin){
    return <Navigate to = "/admin"/>
  }
  
  // If authenticated, render the child components
  return children;
}


export default SecondPrivateRoute;