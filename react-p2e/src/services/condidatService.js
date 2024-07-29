import axios from 'axios';
import { getToken } from './tokenService';
import api from '../api/axios';
const API_URL = 'http://localhost:8080/api/v1/condidat';


class CondidatService {

    async sendNotification(message,id) {
    console.log('sendNotification', message); // Add this
    const token = getToken();
    try {
        const response = await api.post(`${API_URL}/sendNotificationByCondidat/${id}`, {
            message,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json' // Make sure the Content-Type is correct
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error when sending the notification:', error);
        throw error; // Propagate the error to be handled by the calling component
    }
}


}

export default CondidatService;
