import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";


const UserSettings = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

 

  return (
    <div>
      <FaUserCircle size={32} onClick={handleDropdownClick} />
      {showDropdown && (
        <ul className="absolute bg-white text-black py-2 rounded shadow-md border border-gray-300">
          <li className="block px-4 py-2 text-lg font-bolds">username</li>
          <li>
            <Link to="/ChangePasswordForm">
            <button
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Change Password
            </button>
            </Link>
            
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserSettings;