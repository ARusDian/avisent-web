import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BACKGROUND_IMAGE from "../assets/bg2.png";

const Login = () => {
  const [values, setValues] = useState({ name: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const role = localStorage.getItem("role");
      if (role === "Admin") {
        navigate("/admin/home");
      } else if (role === "Operator") {
        navigate("/operator/home");
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", {
        name: values.name,
        password: values.password,
      });
      const data = res.data;
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user_type);
        toast.success(`Login successful! Welcome, ${data.user_type}`);

        if (data.user_type === "Admin") {
          navigate("/admin/home");
        } else if (data.user_type === "Operator") {
          navigate("/operator/home");
        } else {
          setError("Login failed. User type is not recognized.");
        }
      } else {
        setError("Login failed. Please check your name and password.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900 ">
      <form
        className="max-w-md mx-auto bg-[#273444] bg-opacity-100 p-8 rounded-3xl shadow-lg w-2/5"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-2 text-left dark:text-white">
          Login
        </h2>
        <h3 className="text-base mb-16 text-left dark:text-gray-300">
          Sign in to your account to continue
        </h3>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="floating_name"
            id="floating_name"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            required
          />
          <label
            htmlFor="floating_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="floating_password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            required
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>

        {error && <div className="text-red-500 text-sm my-2">{error}</div>}

        <div className="text-center mt-10">
          <button
            type="submit"
            className="text-white bg-[#697077] hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-[#f8dbb3] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Login
          </button>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Login;
