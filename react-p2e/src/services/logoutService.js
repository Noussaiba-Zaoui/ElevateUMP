// logoutService.js

import axios from "axios";
import api from "../api/axios";


const logout = async () => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) {
            throw new Error("Token not found in local storage");
        }

        // Call the logout endpoint on the backend
        await axios.post('http://localhost:8080/api/v1/auth/logout', null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

      

        // Clear locally stored authentication data
        localStorage.removeItem('auth');
        localStorage.removeItem('access_token');
        localStorage.removeItem('persist');
     

        return true; // Return true indicating successful logout
    } catch (error) {
        console.error('Logout failed:', error);
        throw error; // Propagate the error to the caller
    }
};

export default logout;


