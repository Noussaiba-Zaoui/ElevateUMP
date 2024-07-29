import React from "react";
import yellowCar from "../../assets/website/homepic.png";
import {Link} from "react-router-dom";
import { useState, useEffect} from 'react';
import GetSessionStatus from '../../services/GetSessionStatus';
import EspaceProject from "../../services/EspaceProject";
import GetSessionEndDate from '../../services/GetSessionEndDate';
import { isExpired,useJwt } from "react-jwt";
const Hero = () => {
  const token = localStorage.getItem("access_token");
  const { decodedToken } = useJwt(token);
  const isMyTokenExpired = isExpired(token);
  const [sessionOpen, setSessionOpen] = useState();
  const [sessionEndDate, setSessionEndDate] = useState(null);

 useEffect(() => {
    const getSessionStatus = async () => {
      try {
        const response = await GetSessionStatus.getSessionStatus();
        setSessionOpen(response.data);
      } catch (error) {
        console.error('Error fetching status:', error);
      }
    };

    const getSessionEndDate = async () => {
      try {
        const response = await GetSessionEndDate.getCurrentSessionEndDate();
        setSessionEndDate(response.data);
      } catch (error) {
        console.error('Error fetching session end date:', error);
      }
    };

    getSessionStatus();
    getSessionEndDate();
  }, []);

  const deposerProject = async () => {
    try {
  
  
      const redirectUrl = EspaceProject.Redirection2();
  
      window.location.href = redirectUrl;
    } catch (error) {
      console.error('Error Updating project:', error);
    }
  };
  return (
    <div id="heroCondidat" className=" duration-300 ">
      <div className="container min-h-[620px] flex mt-10 sm:mt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 place-items-center">
          {/* Image section */}
          <div data-aos="zoom-in" className="order-1 sm:order-2 relative">
            <img
              src={yellowCar}
              alt=""
              className="w-full sm:max-w-[280px] md:max-w-[430px]"
            />
            <div
              data-aos="slide-right"
              className="absolute -bottom-5 -right-8 px-4 py-2 rounded-xl bg-white  shadow-md"
            >
              <p className="text-gray-500 text-sm ">⭐Projects</p>
              <h1 className="font-bold">
                600+ <span className="font-normal">Done</span>
              </h1>
            </div>
          </div>

          {/* Text section */}
          <div className="space-y-8 order-2 sm:order-1 xl:pr-400 pl-20">
            <h1
              data-aos="fade-up"
              className="text-4xl sm:text-5xl font-bold"
              style={{ lineHeight: 1.2 }}
            >
                <p className="text-lg text-black">Bonjour, {decodedToken && decodedToken.fullName ? decodedToken.fullName : "Utilisateur"} </p>  <br />
              <span className="text-primary">Programme P2E</span>
              <br/> 
              <span className="text-black">Étudiant Entrepreneur {" "}</span>
            </h1>
            <p data-aos="fade-up" data-aos-delay="300" className="text-lg">
              Étudiant à l'université ? Avez-vous une idée de projet innovant ? Vous voulez créer votre propre entreprise ? Le programme d'accompagnement et de financement P2E est fait pour vous !</p>

              <p data-aos="fade-up" data-aos-delay="300" className="text-lg">
        {sessionOpen ? 'La session est ouverte, déposez votre projet !' : 'La session est actuellement fermée. Vous pouvez créer vos projets maintenant et les déposer dès que la prochaine session sera ouverte.'}
      </p>
      {sessionOpen && sessionEndDate ? (
  <p data-aos="fade-up" data-aos-delay="300" className="text-lg">
    La session sera fermée à la date suivante : {new Date(sessionEndDate).toLocaleDateString()}
  </p>
) : null}

            <button
              data-aos="fade-up"
              data-aos-delay="500"
              data-aos-offset="0"
              className={`primary-btn font-bold`} 
              onClick={deposerProject}
            >
              Vite Deposer Vos Projets !
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
