import axios from 'axios';
import { getToken } from './tokenService';
import api from '../api/axios';
const API_URL = 'http://localhost:8080/api/v1/project';

const CalenderEventService = {

    getEvents: (sessionId) => {
        const token = getToken();
        return api.get(`${API_URL}/passage_event/${sessionId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      },

      getConfirmedEvents: (sessionId) =>
        { 
             const token = getToken();
              return api.get(`${API_URL}/entretien_events/${sessionId}`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
         },
  createEvent: (eventRequest) =>
    { 
         const token = getToken();
          api.post(`${API_URL}/event`, eventRequest,{
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
     },

     deleteEvent: (id) =>
      { 
           const token = getToken();
            api.delete(`${API_URL}/delete_event/${id}`,{
              headers: {
                  'Authorization': `Bearer ${token}`,
              }
          })
       },

       deletePresentEvent: (id) =>
        { 
             const token = getToken();
              api.delete(`${API_URL}/delete_present/${id}`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
         },

       confirmPresenceInEntretien: (id) =>
        { 
             const token = getToken();
              api.post(`${API_URL}/confirmPresenceInEntretien/${id}`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
         }

   

       

      
};

export default CalenderEventService;
