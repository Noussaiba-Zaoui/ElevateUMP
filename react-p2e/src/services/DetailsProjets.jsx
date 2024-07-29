import axios from "axios";
import { getToken } from "./tokenService";
import api from "../api/axios";

const API_URL = 'http://localhost:8080/api/v1/project';

class DetailsProjets {
    async getProjectTitlesByDateAndState(startDate, endDate, etat) {
        const token = getToken();
        try {
            const response = await api.get(`${API_URL}/titlesByDateAndState`, {
                params: { startDate, endDate, etat },
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data; // Assume the response is an array of project titles
        } catch (error) {
            throw error;
        }
    }

    GetDetailsByTitle(title) {
        const token = getToken();
        return api.get(`${API_URL}/${title}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }
}

export default new DetailsProjets();
