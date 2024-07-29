import axios from 'axios';
import api from '../api/axios';
import { getToken } from './tokenService';

const Session_URL = 'http://localhost:8080/api/v1/session';
const Notification_URL = 'http://localhost:8080/api/v1/admin';

class SessionService {
    getSessions() {
        const token = getToken();
        return api.get(Session_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.data)
            .catch(error => {
                console.error('There was an error!', error);
                throw error; // Propager l'erreur pour la gérer dans le composant
            });
    }

    createSession(session) {
        const token = getToken();
        return api.post(`${Session_URL}`, session, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.data)
            .catch(error => {
                console.error('There was an error!', error);
                throw error; // Propager l'erreur pour la gérer dans le composant
            });
    }

    updateSession(sessionId, session) {
        const token = getToken();
        return api.put(`${Session_URL}/${sessionId}`, session, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.data)
            .catch(error => {
                console.error('There was an error!', error);
                throw error; // Propager l'erreur pour la gérer dans le composant
            });
    }

    deleteSession(sessionId) {
        const token = getToken();
        return api.delete(`${Session_URL}/${sessionId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.data)
            .catch(error => {
                console.error('There was an error!', error);
                throw error; // Propager l'erreur pour la gérer dans le composant
            });
    }

    sendNotification(message, roles) {
        console.log('sendNotification', message, roles);
        const token = getToken();
        return api.post(`${Notification_URL}/sendNotification`, {
            message: message,
            roles: roles
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.data)
            .catch(error => {
                console.error('Error when sending the notification:', error);
                throw error; // Propager l'erreur pour la gérer dans le composant
            });
    }

    getCurrentSessionId() {
        const token = getToken();
        return api.get(`${Session_URL}/current`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.data) // Assuming your backend returns just the session ID
            .catch(error => {
                console.error('Error fetching current session ID:', error);
                throw error; // Propagate the error to handle it in the component
            });
    }
}

export default new SessionService();