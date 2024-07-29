// apiService.js

import api from "../api/axios";


export const fetchUsers = async () => {
    const token = localStorage.getItem("access_token"); // Retrieve token from local storage
    if (!token) { 
        throw new Error("Token not found in local storage");
    }

    try {
        const response = await api.get('/api/v1/admin/allUsers', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
         throw err; // Let the caller handle the error      
    }
};