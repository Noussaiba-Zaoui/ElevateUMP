// LogoutButton.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import logout from '../services/logoutService';
import useAuth from '../hooks/useAuth';

const LogoutButton = () => {
    const navigate = useNavigate();
    const {setAuth} = useAuth();

    const handleLogout = async () => {
        try {

            await logout();
            setAuth({}); // Call the logout service
            // navigate('/login');
            window.location.href = '/login'; 
        } catch (error) {
            // Handle logout failure (optional)
        }
    };

    return (
        <button className="primary-btn" onClick={handleLogout}>Logout</button>
    );
};

export default LogoutButton;



