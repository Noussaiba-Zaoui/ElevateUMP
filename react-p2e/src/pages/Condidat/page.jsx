import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import './page.css';

// Component import
import Navbar from "../../components/Navbar/NavbarCondidat";
import Hero from "../../components/Hero/HeroCondidat.jsx";
import BrandsLogo from "../../components/BrandsLogo/BrandsLogoCondidat.jsx";
import Services from "../../components/Services/ServicesCondidat.jsx";
import DefP2e from "../../components/DefP2E/defP2eCondidat.jsx";
import Footer from "../../components/Footer/FooterCondidat.jsx";

const page = () => {
  return (
    <div className="bg-white  text-black overflow-x-hidden">
      <Navbar />
      <Hero />
      <BrandsLogo />
      <Services />
      <DefP2e />
      <Footer />
    </div>
  );
};

export default page;
