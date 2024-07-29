// authService.js
import api from "../api/axios";

export const login = async (email, password) => {
    try {
        const response = await api.post('/api/v1/auth/authenticate', {
            email,
            password,
        });


        return response.data;

       
       
    } catch (err) {
        throw err; // Let the caller handle the error
    }
};
