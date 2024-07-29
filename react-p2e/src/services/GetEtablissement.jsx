
import api from "../api/axios";
const ETABLISSEMENT_BASE_REST_API_URL = 'http://localhost:8080/api/v1/etablissements';

class GetEtablissement {
    getEtablissementsOrientalExceptUMP() {
        // const token = getToken();
        return api.get(ETABLISSEMENT_BASE_REST_API_URL,{
            // headers: {
            //     Authorization: `Bearer ${token}`
            // } 
        }); // Utiliser la méthode GET
    }
}

export default new GetEtablissement(); // Exporter le service
