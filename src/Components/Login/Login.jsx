import React from "react";
import { Formik, Form, Field, ErrorMessage, validateYupSchema } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import google from "../Images/google.jpg";
import facebook from "../Images/facebook.png";
import axios from "axios";
import LoadingScreen from "../Loading";
import { useState } from "react";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    setLoading(true); // Start loading when form is submitted
    try {
      const response = await axios.post("https://capstone-backend-h5zz.onrender.com/auth/login", {
        email: values.email,
        password: values.password,
      });

      alert("Login Successful");

      const userRole = response.data.role;

      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
       
        alert("Login failed. Please check your credentials and try again.");
      } else if (error.request) {
       
        alert("Request failed. Please try again later.");
      } else {
      
        alert("Login failed. Please try again later.");
      }
    } finally {
      setLoading(false); // Stop loading after login attempt
    }
  };

  return (
    <div className="bg-slate-300 min-h-screen flex flex-col justify-center items-center">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
      >
        <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col max-w-md">
        {loading && <LoadingScreen />}
          <div className="mb-8 text-3xl font-extrabold text-center text-gray-800">
            Log In
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <Field
              type="text"
              name="email"
              placeholder="Enter Your Email"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-xs italic mt-1"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <Field
              type="password"
              name="password"
              placeholder="Enter Your Password"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-xs italic mt-1"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            >
              Log In
            </button>
            <div className="flex">
              <Link to="" className="mr-2" type="button">
                <img src={google} alt="Google" className="w-8 h-8 rounded" />
              </Link>
              <Link to="">
                <img
                  src={facebook}
                  alt="Facebook"
                  className="w-8 h-8 rounded"
                />
              </Link>
            </div>
          </div>
          <div className="flex justify-between">
            <Link
              to="/register"
              className="text-sm text-blue-500 hover:text-blue-800 mx-1"
            >
             New account
            </Link>
            <Link
              to="/forgot-password"
              className="text-sm text-blue-500 hover:text-blue-800"
            >
              Forgot Password?
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
