import axios from "axios";
import { getToken } from './tokenService';
import api from "../api/axios";
const BASE_REST_API_URL = 'http://localhost:8080/api/v1/admin';
const BASE_AUTH_URL='http://localhost:8080/api/v1/auth';



class CommissionService {



    getCommissionMembers() {


        
        const token = getToken();
        return api.get(BASE_REST_API_URL + '/by-role/COMMISSION',

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        );
    }


    getAllUsers() {
        const token = getToken();
        return api.get(BASE_REST_API_URL + '/allUsers',
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        );
    }

        // New method to get users by session ID
        getUsersBySession(sessionId) {
            const token = getToken();
            return axios.get(`${BASE_REST_API_URL}/session/${sessionId}/users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

    addCommissionMember(memberData, queryParams) {
        const token = getToken();
        return api.post(BASE_REST_API_URL  + queryParams, memberData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        );
    }

    updateCommissionMember(userId,updatedMember,queryParams) {
        const token = getToken();
        return api.put(BASE_REST_API_URL+`/`+userId+queryParams, updatedMember,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        );
    
    }
    getCommissionMemberById(id) {
        const token = getToken();
        return api.get(BASE_REST_API_URL+`/commission-member/`+id,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        );
      }

    deleteCommissionMember(id){
        const token = getToken();
        return api.delete(BASE_REST_API_URL+'/'+id,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        );
    }

    getUserRolesByEmail(email) {
        const token = getToken();
        return api.get(BASE_AUTH_URL + '/getUserRoles', {
            params: {
                userEmail: email
            },
            
                headers: {
                    Authorization: `Bearer ${token}`
                }
            
        });
    }



    addRoleToUser(email, roleName) {
        const token = getToken();
        const queryParams = { email: email, roleName: roleName };
        return api.post(BASE_REST_API_URL + '/addRoleToUser', null, {
             params: queryParams,
             
                headers: {
                    Authorization: `Bearer ${token}`
                }
            
             });
    }
    
    removeRoleFromUser(email, roleName) {
        const token = getToken();
        const queryParams = { email: email, roleName: roleName };
        return api.delete(BASE_REST_API_URL + '/removeRoleFromUser', {
            params: queryParams,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    
    
    
      
    
}

export default new CommissionService();
