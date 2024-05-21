import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import COVER_IMAGE from "../assets/turetgun.jpg";
import axios from "axios";

const Login = () => {
  const [values, setValues] = useState({ name: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", {
        name: values.name,
        password: values.password,
      });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/home");
      } else {
        setError("Login failed. Please check your name and password.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-start">
      <div className="relative w-1/2 h-full flex flex-col">
        <div className="absolute top-[30%] left-[15%] flex flex-col"></div>
        <img
          src={COVER_IMAGE}
          alt="Turret Gun"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-1/2 h-screen bg-[#F5F5F5] flex flex-col p-20 gap-28">
        <h1 className="text-base text-[#060606] font-semibold">AviSent</h1>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col max-w-[550px]"
        >
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-3xl font-bold mb-2">Login</h3>
          </div>
          <div className="w-full flex flex-col">
            <input
              type="text"
              placeholder="Name"
              className="w-full text-black py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full text-black py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              value={values.password}
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>
          {error && <div className="text-red-500 text-sm my-2">{error}</div>}

          <button
            type="submit"
            className=" flex flex-col my-4 text-white bg-[#697077] rounded-md p-4 text-center items-center justify-center hover:bg-[#46423c]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
