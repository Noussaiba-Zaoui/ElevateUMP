import axios from "axios";
import api from "../api/axios";
import { getToken } from "./tokenService";

const VILLE_BASE_REST_API_URL = 'http://localhost:8080/api/v1/villes';

class GetVilles {
    getVillesOriental() {
        // const token = getToken();
        return api.get(VILLE_BASE_REST_API_URL,{
            // headers: {
            //     Authorization: `Bearer ${token}`
            // } 
        })
    }
}

export default new GetVilles();