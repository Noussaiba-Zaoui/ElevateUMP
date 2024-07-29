import axios from 'axios';
import { getToken } from "./tokenService";
import api from '../api/axios';
const API_URL = 'http://localhost:8080/api/v1/session';

const getCurrentSessionEndDate = async () => {
    const token = getToken();
  return await api.get(`${API_URL}/currentEndDate`,{
    headers: {
        Authorization: `Bearer ${token}`
    } 
});
};

export default {
  getCurrentSessionEndDate,
};
