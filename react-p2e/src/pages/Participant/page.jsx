import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import './page.css';

// Component import
import Navbar from "../../components/Navbar/NavbarParticipant";
import Hero from "../../components/Hero/HeroParticipant.jsx";
import BrandsLogo from "../../components/BrandsLogo/BrandsLogoParticipant.jsx";
import Services from "../../components/Services/ServicesParticipant.jsx";
import DefP2e from "../../components/DefP2E/defP2eParticipant.jsx";
import Footer from "../../components/Footer/FooterParticipant";

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
