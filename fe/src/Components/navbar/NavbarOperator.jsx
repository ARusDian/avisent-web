import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import logo from "./../../assets/logo.png";
import profile from "./../../assets/profile.png";
import axios from "axios";

export function NavbarOperator() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("token");

      if (accessToken) {
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const response = await axios.post(
          "http://127.0.0.1:8000/api/logout",
          null,
          config
        );
        
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.error("Token tidak ditemukan.");
      }
    } catch (error) {
      console.error("Logout gagal:", error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        console.error(
          "Token kadaluwarsa atau tidak valid. Token telah dihapus dari localStorage."
        );
      }
    }
  };

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
          to={"/operator/home"}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "font-bold text-[#f8dbb3]" : undefined
          }
          to={"/operator/log"}
        >
          Log
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "font-bold text-[#f8dbb3]" : undefined
          }
          to={"/operator/turret"}
        >
          Turret
        </NavLink>
      </div>

      <div className="flex items-center gap-x-5 font-roboto text-white">
        <button
          onClick={handleLogout}
          className="text-xs inline-block border-2 border-[#5D5E5F] shadow-lg px-3 py-2 rounded hover:bg-[#f8dbb3]"
        >
          Log Out
        </button>
        <img src={profile} alt="Profile" className="inline-block" />
      </div>
    </nav>
  );
}
