import React from "react";
import respclnd from "./respclnd.png";
import { Link } from "react-router-dom";
import { isExpired,useJwt } from "react-jwt";
import { getToken } from "../../services/tokenService";


const RespHero = () => {

  const token =getToken();
  const { decodedToken } = useJwt(token);
  return (
    <>
    
  
    <div className=" duration-300 ">
      <div className="container min-h-[620px] flex mt-10 sm:mt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center">
          {/* Image section */}
          <div data-aos="zoom-in" className="order-1 sm:order-2 relative">
            <img
      
              src={respclnd}
              alt=""
              className="w-full sm:max-w-[400px] md:max-w-[500px]"
            />
          </div>

          {/* Text section */}
          <div className="space-y-8 order-2 sm:order-1 xl:pr-400 pl-20">
            <h1
                data-aos="fade-up"
                className="text-4xl sm:text-5xl font-semibold"
                style={{lineHeight: 1.2}}
            >
              <span className="text-primary font-semibold">Bienvenue </span>
              <br/> {decodedToken && decodedToken.fullName ? decodedToken.fullName : "Admin"}  {" "}{ /*remove hard coded after adding back end logic */}

            </h1>
            <p data-aos="fade-up" data-aos-delay="300" className="text-lg">
            Bienvenue dans votre espace personnel dédié à la gestion des calendriers au sein du programme P2E.
            </p>
            <div className="flex space-x-4">
            <Link to="/RespSessions"
                  className="primary-btn font-semibold text-white"
                  data-aos="fade-up"
                  data-aos-delay="500"
                  data-aos-offset="0">
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

export default RespHero;