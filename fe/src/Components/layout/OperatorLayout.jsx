import { Outlet } from "react-router-dom";
import { NavbarOperator } from "../navbar/NavbarOperator";
import Footer from "./../../Components/Footer";

export function OperatorLayout() {
  return (
    <div>
      <NavbarOperator />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
