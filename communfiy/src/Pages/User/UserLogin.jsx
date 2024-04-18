import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { set_Authentication } from "../../Redux/authentication/authenticationSlice";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";


const UserLogin = () => {
  const [formError, setFormError] = useState([]);
  const navigate = useNavigate();
  const baseUrl = "http://127.0.0.1:8000";
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.authentication_user.isAuthenticated);
  const isAdmin = useSelector((state) => state.authentication_user.isAdmin);
  console.log(isAuthenticated)

  useEffect(() => {
    // Check if the user is authenticated and a superuser
    if (isAuthenticated && isAdmin) {
      navigate("/admin/home");
    }
  }, [isAuthenticated, isAdmin, navigate]);


  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError([]);

    const formData = {
      username_or_email: event.target.username_or_email.value,
      password: event.target.password.value,
    };

    try {
      const res = await axios.post(baseUrl + "/api/login/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        const accessToken = localStorage.getItem("access");
        const refreshToken = localStorage.getItem("refresh");
        console.log(refreshToken)
        console.log(accessToken)
        console.log(")))))))))))))))))))))))))))))))))))))))))")
        

        dispatch(
          set_Authentication({
            username: jwtDecode(res.data.access).username,
            isAuthenticated: true,
            isAdmin: res.data.isAdmin,
          })
        );

        // localStorage.setItem("authInfo", JSON.stringify({
        //   username: jwtDecode(res.data.access).username,
        //   isAuthenticated: true,
        //   isAdmin: res.data.isAdmin,
        // }));

        navigate("/home", {
          state: res.data.message,
        });
        return res;
      }
    } catch (error) {
      if (error.response && error.response.status === 406) {
   
        setFormError(error.response.data.message);
      } else {

        setFormError(error.response.data);
      }
    }
  };
  useEffect(() => {
    // Check if the user is authenticated and isAdmin
    if (isAuthenticated ) {
      navigate("/home");
    }
  }, [isAuthenticated,navigate]);
  return (
    <>

      <div className="flex min-h-full lg:pb-48 flex-1 bg-zinc-200 flex-col justify-center bg-red px-6 py-12 lg:px-8" style = {{height: "100vh"}} >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            // src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            // alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            action="#"  
            method="POST"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Enter Your Username or Email address
              </label>
              <div className="mt-2">
                <input
                  id="username_or_email"
                  name="username_or_email"
                  type="username_or_email"
                  autoComplete="username_or_email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                <Link to="forgot-password"> Forgot password?</Link>
                   
                  
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {Object.keys(formError).length >= 0 && (
                <div className="text-red-500">
                  {Object.entries(formError).map(([field, message], index) => (
                    <p key={index} className="text-red-500">
                      {message} {/* Use message directly */}
                    </p>
                  ))}
                </div>
              )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-zinc-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <span className="font-semibold leading-6 text-zinc-600 hover:text-zinc-500">
              <Link to="register">create a new account</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
