import { Outlet } from "react-router-dom";
import Fotter from "../footer/Fotter";
import Navbar from "../Navbar/Navbar";

export default function Layout() {
  return (
   <>
   <Navbar />
   
   <Outlet />
   
   <Fotter />
   
   </>
  )
}
