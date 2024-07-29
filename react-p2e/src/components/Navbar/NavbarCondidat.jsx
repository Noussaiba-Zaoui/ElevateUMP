import React, { useState } from "react";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "./Responsive";

import Logo from "./2.png";


import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import {  useJwt } from "react-jwt";

import LogoutButton from "../../layouts/LogoutBtn";
import { HiOutlineBellAlert } from "react-icons/hi2";
import SecondLogo from "./1.png";
export const MenuLinks = [
  {
    id: 1,
    name: "Acceuil",
    link: "/condidatHome#heroCondidat",
  },
  {
    id: 2,
    name: "Services",
    link: "/condidatHome#servicesCondidat",
  },
  {
    id: 3,
    name: "Explorer P2E",
    link: "/condidatHome#defp2eCondidat",
  },
  {
    id: 4,
    name: "Nous Contacter",
    link: "#footerCondidat",
  },
  {
    id: 5,
    name: "Gérer mes projets",
    link: "/deposer2",
  }

];


const NavbarCondidat = () => {
  const token = localStorage.getItem("access_token");
  const { decodedToken } = useJwt(token);
  const [showMenu, setShowMenu] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  // State variables for handling popup messages
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleUserInfo = () => {
    setShowUserInfo(!showUserInfo);
  };


 
  

  return (
    <div
      className="relative z-10 w-full  duration-300"
    >
      <div className="container py-3 md:py-2">
          <div className="flex justify-between items-center">
              {/* Logo section */}
              <div className="flex items-center gap-3">
                  <a
                      target="_blank"
                      className="flex items-center gap-3"
                  >
                      <img src={Logo} alt="Second Logo" className="w-20 h-20 md:w-20 md:h-20"/> {/* Adjust size here */}
                  </a>
                  <a
                      target="_blank"
                      className="flex items-center gap-3"
                  >
                      <img src={SecondLogo} alt="Logo" className="w-20 h-20 md:w-20 md:h-20"/> {/* Adjust size here */}
                  </a>
              </div>
              {/* Desktop view Navigation */}
              <nav className="hidden md:block">
                  <ul className="flex items-center gap-6">
                      {MenuLinks.map(({id, name, link}) => (
                          <li key={id} className={`${id === 5 ? 'primary-btn font-semibold' : ''}`}>
                              <a
                                  href={link}
                                  className={`text-lg font-medium hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500`}
                              >
                                  {name}
                              </a>
                          </li>
                      ))}

                      <li className="py-2">
                          <button onClick={toggleUserInfo} className="text-gray-500">
                              <FaUserCircle className="text-black ml-2" size={32}/>
                          </button>
                      </li>
                     


                  </ul>
              </nav>
              {/* Mobile view Drawer  */}
              <div className="flex items-center gap-4 md:hidden ">

                  {/* Mobile Hamburger icon */}
                  {showMenu ? (
                      <HiMenuAlt1
                          onClick={toggleMenu}
                          className=" cursor-pointer transition-all"
                          size={30}
                      />
                  ) : (
                      <HiMenuAlt3
                          onClick={toggleMenu}
                          className="cursor-pointer transition-all"
                          size={30}
                      />
                  )}
                  <li className="py-4">
                      <button onClick={toggleUserInfo} className="text-gray-500">
                          <FaUserCircle className="text-gray-500 ml-4" size={24}/>
                      </button>
                  </li>
                  
              </div>
          </div>
      </div>
        <ResponsiveMenu showMenu={showMenu}/>
        {/* User Info Popup */}
        {showUserInfo && (
            <div className="absolute top-0 right-0 mt-14 mr-4 bg-white p-4 shadow-lg rounded-lg">
                <div className="flex items-center mb-2">
                    {/* Place user information here */}
                    {/* Example: <img src={user.avatar} alt={user.name} className="rounded-full w-8 h-8 mr-2" /> */}
                    <div>
                        <p className="text-lg font-semibold">{decodedToken && decodedToken.fullName}</p>
                        <p className="text-gray-500">{decodedToken && decodedToken.sub}</p>
            </div>
          </div>
          <div className="flex justify-between">
          <LogoutButton/>
          

          <Link to="/ChangePasswordForm">
             <button className="primary-btn">Modifier</button>
          </Link>
            
          </div>
        </div>
      )}
     

 <div>
     

      
    </div>
    </div>
  );
};

export default NavbarCondidat;
