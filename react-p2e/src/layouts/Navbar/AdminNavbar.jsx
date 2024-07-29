
import React, { useState, useEffect } from "react";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "../../layouts/Navbar/ResponsiveMenu";
import Logo from "../../components/Navbar/2.png";
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { useJwt } from "react-jwt";
import LogoutButton from "../../layouts/LogoutBtn";
import SecondLogo from "../../components/Navbar/1.png";

const AdminNavbar = ({sessionId,startDate,endDate,home}) => {
  const token = localStorage.getItem("access_token");
  const { decodedToken } = useJwt(token);
  const [showMenu, setShowMenu] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [menuLinks, setMenuLinks] = useState([]);

  useEffect(() => {
    const links = [
      {
        id: 1,
        name: "Gestion utilisateurs",
        link:`/session/${startDate}/${endDate}/${sessionId}/users`,
      },
      {
        id: 2,
        name: "Calendriers",
        dropdown: true,
        children: [
          { id: 3, name: "Calendrier de passage", link: `/AdminVoirCalenderPassage/${startDate}/${endDate}/${sessionId}` },
          { id: 4, name: "Calendrier d'entretien", link: `/AdminVoirCalenderEntretien/${startDate}/${endDate}/${sessionId}` },
        ]
      },
      
      {
        id: 3,
        name: "Accueil",
        link: `/${home}`,
      },
    ];
    setMenuLinks(links);
  }, [sessionId]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleUserInfo = () => {
    setShowUserInfo(!showUserInfo);
  };

  console.log("Menu Links:", menuLinks); // Debugging

  return (
    <div className="relative z-10 w-full duration-300">
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
              {menuLinks.map(({id, name, link, dropdown, children}) => (
                  <li key={id} className={`${id === 5 ? 'primary-btn font-semibold' : ''}`}>
                    {dropdown ? (
                        <div className="relative">
                          <button
                              className="text-lg font-medium hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500"
                              onClick={() => setShowMenu(!showMenu)}
                          >
                            {name}
                          </button>
                          {showMenu && (
                              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                                <ul className="py-2">
                                  {children.map(({id: childId, name: childName, link: childLink}) => (
                                      <li key={childId} className="px-4 py-2">
                                        <Link to={childLink} className="text-gray-900 hover:text-primary block">
                                          {childName}
                                        </Link>
                                      </li>
                                  ))}
                                </ul>
                              </div>
                          )}
                        </div>
                    ) : (
                        <Link
                            to={link}
                            className={`text-lg font-medium hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500`}
                        >
                          {name}
                        </Link>
                    )}
                  </li>
              ))}
              <li className="py-4">
                <button onClick={toggleUserInfo} className="text-gray-500">
                  <FaUserCircle className="text-black ml-4" size={34}/>
                </button>
              </li>
            </ul>
          </nav>
          {/* Mobile view Drawer  */}
          <div className="flex items-center gap-4 md:hidden">
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
            <li className="py-4">
              <button onClick={toggleUserInfo} className="text-gray-500">
                <FaUserCircle className="text-gray-500 ml-4" size={24}/>
              </button>
            </li>
          </div>
        </div>
      </div>
      {showMenu && menuLinks.length > 0 && <ResponsiveMenu links={menuLinks}/>} {/* Check if menuLinks is defined */}
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
             <button className="ml-5 primary-btn">Modifier</button>
          </Link>
            
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminNavbar;

