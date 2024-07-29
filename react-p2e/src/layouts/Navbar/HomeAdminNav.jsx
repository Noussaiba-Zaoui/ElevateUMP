
//import Logo from "../../assets/website/logo.svg";
import React, { useState } from "react";
import ResponsiveMenu from "./ResponsiveMenu";
import {  useJwt } from "react-jwt";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";

import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import Logo from "../../components/Navbar/2.png";

import LogoutButton from "../LogoutBtn";
import SecondLogo from "../../components/Navbar/1.png";



const HomeAdminNav =({home})=>{


  const [showMenu, setShowMenu] = useState(false);
  const toggleUserInfo = () => {
    setShowUserInfo(!showUserInfo);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  
  

  const token = localStorage.getItem("access_token");
  const { decodedToken } = useJwt(token);

  const [showUserInfo, setShowUserInfo] = useState(false);


 
 

    return(
<div
className="relative z-10 w-full  duration-300
"
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
      <ul className="flex items-center gap-8">

        <li>
          <Link to={`/${home}`}
                className={`text-lg font-medium hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500`}
          >
            Acceuil
          </Link>
        </li>

        <li className="py-4">
          <button onClick={toggleUserInfo} className="text-gray-500">
            <FaUserCircle className="text-black ml-4" size={35}/>
          </button>
        </li>
      </ul>
    </nav>

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
              <button className="ml-5  primary-btn">Modifier</button>
            </Link>

          </div>
        </div>
    )}


  </div>
</div>

</div>
    )
}
export default HomeAdminNav;









