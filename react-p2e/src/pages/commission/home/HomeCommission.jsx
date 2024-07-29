import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import HomeAdminNav from "../../../layouts/Navbar/HomeAdminNav";
import CommissionHero from "./CommissionHero";



// Component import




const HomeCommission = () => {
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

      <HomeAdminNav home="commissionHome"/>
      <CommissionHero />
     
   
      
    </div>
  );
};

export default HomeCommission;
