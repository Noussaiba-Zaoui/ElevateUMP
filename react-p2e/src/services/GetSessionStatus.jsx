import axios from "axios";
import api from "../api/axios";

const STATUS_BASE_REST_API_URL = 'http://localhost:8080/api/v1/session/status';

class GetSessionStatus {
    getSessionStatus() {
       
        return api.get(STATUS_BASE_REST_API_URL,{
           
        }); // Utiliser la méthode GET
    }
}

export default new GetSessionStatus(); // Exporter le service
