import React from 'react'
import { useSelector } from 'react-redux';

function Test() {
  const { username, isAuthenticated, isAdmin } = useSelector(state => state.authentication_user);

  // Log the values to the console
  

  return (
    <div>
      asdfasdfasdf
    </div>
  )
}

export default Test
