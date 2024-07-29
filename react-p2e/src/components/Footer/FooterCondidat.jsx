import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { FiFacebook, FiYoutube, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  return (
      <div id="footerCondidat" className="bg-dark text-white">
        <section className="container py-10">
          <div className="grid md:grid-cols-3 py-5">
            {/* Contactez-nous */}
            <div className="py-8 px-4 ">
              <h1 className="sm:text-2xl text-xl font-bold mb-3">Contactez-nous</h1>
              <div className="flex items-center mb-2">
                <FaMapMarkerAlt className="mr-2" size={30}  />
                <p>Adresse :
                  Université Mohammed Premier, BV Mohammed VI B.P. 524 Oujda 60000 Maroc, Oujda, Morocco </p>
              </div>
              <div className="flex items-center mt-6 mb-2">
                <FaPhone className="mr-2" />
                <p>Téléphone : +212 536 50 06 14</p>
              </div>
              <div className="flex items-center mt-6">
                <FaEnvelope className="mr-2 " />
                <p>E-mail : p2e@ump.ac.ma</p>
              </div>
              <br />
              {/* Suivez-nous */}
              <h1 className="sm:text-2xl text-xl font-bold mb-3 mt-6">Suivez-nous</h1>
              <div className="flex items-center gap-4 mt-2">
                <a href="https://www.facebook.com/ump.p2e">
                  <FiFacebook className="text-2xl hover:text-primary duration-300" />
                </a>
                <a href="https://www.youtube.com/channel/UCyFXZbYLiKOkthY26bCPn1Q">
                  <FiYoutube className="text-2xl hover:text-primary duration-300" />
                </a>
                <a href="https://www.linkedin.com/">
                  <FiLinkedin className="text-2xl hover:text-primary duration-300" />
                </a>
              </div>
            </div>
            {/* Liens rapides */}
            <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
              <div className="">
                <div className="py-8 px-4">
                  <h1 className="sm:text-xl text-xl font-bold mb-3">Liens rapides</h1>
                  <ul className={`flex flex-col gap-3`}>
                    <li className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-400 ">
                      <a href="/condidatHome#heroCondidat">Accueil</a>
                    </li>
                    <li className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-400 ">
                      <a href="/condidatHome#defp2eCondidat">Explorez notre Programme </a>
                    </li>
                    <li className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-400 ">
                      <a href="/condidatHome#servicesCondidat">Services</a>
                    </li>
                    <li className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-400 ">
                      <a href="/condidatHome#footerCondidat">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Ressources */}
              <div className="">
                <div className="py-8 px-4">
                  <h1 className="sm:text-xl text-xl font-bold mb-3">Ressources</h1>
                  <ul className="flex flex-col gap-3">
                    <li className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-400 ">
                      <a href="/startup-guide">Guide du démarrage d'entreprise</a>
                    </li>
                    <li className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-400 ">
                      <a href="/innovation-articles">Articles sur l'innovation</a>
                    </li>
                    <li className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-400 ">
                      <a href="/business-planning-tools">Outils de planification commerciale</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Politique de confidentialité */}
          <div className="text-center text-sm text-gray-400 mt-6">
            <span className="pull-right">Copyright © <b>Programme P2E</b>, All rights reserved.</span></div>
        </section>
      </div>
  );
};


export default Footer;
