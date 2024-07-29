import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import AdminHero from "../../layouts/Hero/AdminHero";
import HomeAdminNav from "../../layouts/Navbar/HomeAdminNav";
import Pending from "./Pending";
import LogoutButton from "../../layouts/LogoutBtn";

// Component import




const HomeAdmin = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-white  text-black overflow-x-hidden">
      
      <HomeAdminNav home={"homeAdmin"} />
      <AdminHero />
      <Pending/>
   
      
    </div>
  );
};

export default HomeAdmin;