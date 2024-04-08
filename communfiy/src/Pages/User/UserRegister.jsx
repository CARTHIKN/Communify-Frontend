import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function UserRegister() {
  const [formError, setFormError] = useState([]);
  const navigate = useNavigate();
  const baseUrl = "http://127.0.0.1:8000";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError([]);
    const password = event.target.password.value;
    const passwordConfirmation = event.target.password_confirmation.value;
  
    

    if (password !== passwordConfirmation) {
      setFormError([
        { field: "password_confirmation", message: "Passwords do not match !" },
      ]);
      return; 
    }
    console.log("33333333333333333")
    const formData = {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
      phone: event.target.phone.value,
    };
    console.log(name)

    try {
      const res = await axios.post(baseUrl + "/api/register/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
          navigate("/otp", {
            state: { email: event.target.email.value,isForChangePassword:false },
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

  return (
    <div class=" mx-auto ">
      <div className="flex min-h-full flex-1 flex-col justify-center bg-red px-6 py-6 lg:px-8  ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            // src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            // alt="Your Company"
          />
          <h2 className="text-center text-xl font-bold leading-9 tracking-tight text-indigo-600 ">
            Create your account
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
              </div>
              <div className="mt-2">
                <input
                  name="username"
                  type="text"
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
                  Email
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="typeEmailX-2"
                  name="email"
                  type="email"
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
                  Phone
                </label>
              </div>
              <div className="mt-2">
                <input
                  name="phone"
                  type="number"
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
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
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
                  Re enter password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {formError.length > 0 && (
              <div className="text-fuchsia-500">
                {formError.map((error, index) => (
                  <p key={index} className="text-red-500">
                    {error.message}
                  </p>
                ))}
              </div>
            )}

            {Object.keys(formError).length >= 0 && (
              <div className="text-red-500">
                {Object.entries(formError).map(([field, message], index) => (
                  <p key={index} className="text-red-500">
                    {message[0]}
                  </p>
                ))}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            <span>Already have account ?</span>
            <Link to="/">Sign In</Link>{" "}
            {/* Assuming you want to change the text */}
            <span className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"></span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserRegister;
