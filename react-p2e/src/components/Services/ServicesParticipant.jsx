import React from "react";
import pic2 from "../../assets/icones/pic2.png";
import pic3 from "../../assets/icones/pic3.png";
import pic4 from "../../assets/icones/pic4.png";
import pic1 from "../../assets/icones/pic1.png";

const skillsData = [
  {
    name: "Incubation ",
    icon: <img src={pic3} alt="Incubation" style={{width: '90px', height: '90px'}} />,
  },
  {
    name: "Accompagnemet ",
    icon: <img src={pic4} alt="Accompagnemet" style={{width: '78px', height: '90px'}} />,
  },
  {
    name: "Financement ",
    icon: <img src={pic1} alt="Financement" style={{width: '90px', height: '90px'}} />,
    link: "#",
  },
  {
    name: "Formation",
    icon:<img src={pic2} alt="Formation" style={{width: '110px', height: '90px'}} />,
  },
];

const ServicesParticipant = () => {
  return (
      <>
        <span id="servicesParticipant"></span>
        <div className="bg-gray-100  py-12 sm:grid sm:place-items-center">
          <div className="container">
            {/* Header */}
            <div className="pb-12 text-center space-y-3">
              <h1
                  data-aos="fade-up"
                  className="text-4xl font-bold sm:text-3xl text-violet-950"
              >
                Découvrez nos services :
              </h1>
             
            </div>

            {/* services cards */}
            <div className="grid grid-cols-5 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {skillsData.map((skill) => (
                  <div
                      key={skill.name}
                      data-aos="fade-up"
                      data-aos-delay={skill.aosDelay}
                      className="card space-y-3 sm:space-y-4 p-4"
                  >
                    <div>{skill.icon}</div>
                    <h1 className="text-lg font-semibold">{skill.name}</h1>
                    <p className="text-gray-600 ">
                      {/*skill.description*/}
                    </p>
                  </div>
              ))}
            </div>

            {/* button */}
            <div
                data-aos="fade-up"
                data-aos-delay="900"
                data-aos-offset="0"
                className="text-center mt-4 sm:mt-8"
            >
              <button className="primary-btn">En Savoir Plus </button>
            </div>
          </div>
        </div>
      </>
  );
};

export default ServicesParticipant;