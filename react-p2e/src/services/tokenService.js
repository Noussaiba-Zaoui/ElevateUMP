// tokenService.js
import { decodeToken } from "react-jwt";

export const getToken = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
        throw new Error("Token not found in local storage");
    }
    return token;
};





