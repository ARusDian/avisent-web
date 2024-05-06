import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import profile from "../assets/profile.png";

const Navbar = () => {
  return (
    <nav className="w-full flex flex-row border-b-2 justify-between px-10 py-2 bg-gray-800">
      <div className="flex items-center gap-x-5">
        <a
          href="/"
          className="flex items-center space-x-3 font-bold font-roboto text-white"
        >
          <img src={logo} alt="Logo" className="w-14 h-14" />
          <span>AviSent</span>
        </a>
      </div>

      <div className="flex gap-x-5 font-roboto items-center text-white">
        <NavLink
          className={({ isActive }) =>
            isActive ? "font-bold text-[#f8dbb3]" : undefined
          }
          to={"/home"}
        >
          Home
        </NavLink>
        <a href="#">Spesification</a>
        <NavLink
          className={({ isActive }) =>
            isActive ? "font-bold text-[#f8dbb3]" : undefined
          }
          to={"/log"}
        >
          Log
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "font-bold text-[#f8dbb3]" : undefined
          }
          to={"/addturret"}
        >
          Add Turret
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "font-bold text-[#f8dbb3]" : undefined
          }
          to={"/addaccount"}
        >
          Add Account
        </NavLink>
      </div>

      <div className="flex items-center gap-x-5 font-roboto text-white">
        <a
          href="/login"
          className="text-xs inline-block border-2 border-[#5D5E5F] shadow-lg px-3 py-2 rounded hover:bg-[#f8dbb3]"
        >
          Log Out
        </a>
        <img src={profile} alt="Profile" className="inline-block" />
      </div>
    </nav>
  );
};

export default Navbar;
