import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import './HomePage.css';

// Component import
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero.jsx";
import BrandsLogo from "../../components/BrandsLogo/BrandsLogo.jsx";
import Services from "../../components/Services/Services.jsx";
import DefP2e from "../../components/DefP2E/defP2e.jsx";
import Footer from "../../components/Footer/Footer";

const HomePage = () => {
  return (
    <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
      <Navbar />
      <Hero />
      <BrandsLogo />
      <Services />
      <DefP2e />
      <Footer />
    </div>
  );
};

export default HomePage;
