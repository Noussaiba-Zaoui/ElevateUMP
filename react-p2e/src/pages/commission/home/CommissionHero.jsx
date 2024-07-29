import React from "react";
import yellowCar from "../../../assets/website/P2E.png";
import { Link } from "react-router-dom";
import { getToken } from "../../../services/tokenService";
import {useJwt } from "react-jwt";
import Commision  from "./mega-creator.png";
import HomeAdminNav from "../../../layouts/Navbar/HomeAdminNav";


const CommissionHero = () => {

   const token = getToken();
  const { decodedToken } = useJwt(token);



  // Check if decodedToken is null before accessing its properties
 if (!decodedToken) {
  return <div>Loading...</div>;
}

  return (
    <>
 
 
    <div className=" duration-300 ">
      <div className="container min-h-[620px] flex mt-10 sm:mt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center">
          {/* Image section */}
          <div data-aos="zoom-in" className="order-1 sm:order-2 relative">
            <img
      
              src={Commision}
              alt=""
              className="w-full sm:max-w-[800px] md:max-w-[800px]"
            />
          </div>

          

          {/* Text section */}
          <div className="space-y-8 order-2 sm:order-1 xl:pr-400 pl-20">
            <h1
                data-aos="fade-up"
                className="text-4xl sm:text-5xl font-semibold text-left"
                style={{lineHeight: 1.2}}
            >
              <span className="text-primary">Bienvenue</span>
              <br/>{ /*remove hard coded after adding back end logic */}
              <span className="text-black">{decodedToken.fullName}</span>
            </h1>
            <p data-aos="fade-up" data-aos-delay="300" className="text-lg">
             <i>Vous êtes connecté en tant que membre de la commission.</i>
            <br/>Bienvenue dans votre espace personnel dédié au suivie du programme P2E.
            </p>
            <div className="flex space-x-4">
           
            <Link to="/VoirSession"
                  className="primary-btn font-semibold text-white"
                 >
                Voir les Sessions
              </Link>
             
           
           
            </div>
           
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CommissionHero;
