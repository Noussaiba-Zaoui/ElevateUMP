import React from "react";
import yellowCar from "../../assets/website/homepic.png";
import {Link} from "react-router-dom";

const Hero = () => {
  return (
    <div id="hero" className=" duration-300 ">
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
              <span className="text-primary">Programme P2E</span>
              <br/> Étudiant Entrepreneur {" "}
            </h1>
            <p data-aos="fade-up" data-aos-delay="300" className="text-lg">
              Étudiant à l'université ? Avez-vous une idée de projet innovant ? Vous voulez créer votre propre entreprise ? Le programme d'accompagnement et de financement P2E est fait pour vous !</p>

              <Link to="/signup" >
                  <button
                  data-aos="fade-up"
                  data-aos-delay="500"
                  data-aos-offset="0"
                  className="primary-btn font-bold mt-4"
                >
                  Vite inscris toi !
                </button>
              </Link>
            

          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
