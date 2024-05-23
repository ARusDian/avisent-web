import { Outlet } from "react-router-dom";
import { NavbarAdmin } from "../navbar/NavbarAdmin";
import Footer from "./../../Components/Footer";

export function AdminLayout() {
  return (
    <div>
      <NavbarAdmin />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
