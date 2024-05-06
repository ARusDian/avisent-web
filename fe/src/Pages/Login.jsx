import { useNavigate } from "react-router-dom";
import { useState } from "react";
import COVER_IMAGE from "../assets/turetgun.jpg";

const validUser = {
  email: "avisent@gmail.com",
  password: "avisent123",
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex items-start">
      <div className="relative w-1/2 h-full flex flex-col">
        <div className="absolute top-[30%] left-[15%] flex flex-col"></div>
        <img
          src={COVER_IMAGE}
          alt="Turret Gun"
          className="w-full h-full object-cover"
        ></img>
      </div>

      <div className="w-1/2 h-screen bg-[#F5F5F5] flex flex-col p-20 gap-28">
        <h1 className="text-base text-[#060606] font-semibold">AviSent</h1>

        <div className="w-full flex flex-col max-w-[550px]">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-3xl font-bold mb-2">Login</h3>
          </div>
          <div className="w-full flex flex-col">
            <input
              type="email"
              placeholder="Email"
              className="w-full text-black py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full text-black py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className=" flex flex-col my-4 text-white bg-[#697077] rounded-md p-4 text-center items-center justify-center hover:bg-[#46423c]">
            <button onClick={() => navigate("/home")}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
