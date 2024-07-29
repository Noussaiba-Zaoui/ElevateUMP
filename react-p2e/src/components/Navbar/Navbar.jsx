import React, { useState } from "react";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";
import Logo from "./2.png";
import SecondLogo from "./1.png"; // Import the second logo
import DarkMode from "./DarkMode";
import { Link } from 'react-router-dom';

export const MenuLinks = [
  {
    id: 1,
    name: "Acceuil",
    link: "/#hero",
  },
  {
    id: 2,
    name: "Services",
    link: "/#Services",
  },
  {
    id: 3,
    name: "Explorer P2E",
    link: "/#defp2e",
  },
  {
    id: 4,
    name: "Nous Contacter",
    link: "/#footer",
  },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
      <div className="relative z-10 w-full dark:bg-black dark:text-white duration-300">
        <div className="container py-3 md:py-2">
          <div className="flex justify-between items-center">
            {/* Logo section */}
            <div className="flex items-center gap-3">
              <a
                  target="_blank"
                  className="flex items-center gap-3"
              >
                <img src={Logo} alt="Second Logo" className="w-20 h-20 md:w-20 md:h-20" /> {/* Adjust size here */}
              </a>
              <a
                  target="_blank"
                  className="flex items-center gap-3"
              >
                <img src={SecondLogo} alt="Logo" className="w-20 h-20 md:w-20 md:h-20" /> {/* Adjust size here */}
              </a>
            </div>
            {/* Desktop view Navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center gap-8">
                {MenuLinks.map(({ id, name, link }) => (
                    <li key={id} className="py-4">
                      <a
                          href={link}
                          className="text-lg font-medium hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500"
                      >
                        {name}
                      </a>
                    </li>
                ))}
                <Link to="/login" className="login-btn font-semibold">Login</Link> {/* adapting loginPath later */}
                <Link to="/signup" className="primary-btn font-semibold">SignUp</Link> {/* adapting SignUpPath later */}
                <DarkMode />
              </ul>
            </nav>
            {/* Mobile view Drawer */}
            <div className="flex items-center gap-4 md:hidden ">
              <DarkMode />
              {/* Mobile Hamburger icon */}
              {showMenu ? (
                  <HiMenuAlt1
                      onClick={toggleMenu}
                      className="cursor-pointer transition-all"
                      size={30}
                  />
              ) : (
                  <HiMenuAlt3
                      onClick={toggleMenu}
                      className="cursor-pointer transition-all"
                      size={30}
                  />
              )}
            </div>
          </div>
        </div>
        <ResponsiveMenu showMenu={showMenu} />
      </div>
  );
};

export default Navbar;
