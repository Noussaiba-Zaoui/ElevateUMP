
import axios from "axios";
import { getToken } from "./tokenService";
import api from "../api/axios";
const PROJECT_BASE_API_URL = 'http://localhost:8080/api/v1/project/titles';
const PROJECT2_BASE_API_URL = 'http://localhost:8080/api/v1/project/titles2';
const DEPOSER_BASE_API_URL = 'http://localhost:8080/api/v1/project/depose';
const DELETE_BASE_API_URL = 'http://localhost:8080/api/v1/participant/Project';
const CREE_BASE_API_URL = 'http://localhost:8080/api/v1/project/cree';
const DEPOSE_BASE_API_URL = 'http://localhost:8080/api/v1/project/depose';
const BASE_REST_API_URL = 'http://localhost:8080/api/v1/admin';
class EspaceProject {
    GetProjectsCree(email) {
        const token = getToken();
        return api.get(`${CREE_BASE_API_URL}/${email}`,{
            headers: {
                Authorization: `Bearer ${token}`
            } 
        });
    }

    GetProjectsDeposed(email) {
        const token = getToken();
        return api.get(`${DEPOSE_BASE_API_URL}/${email}`,{
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

    deleteProject(projectId) {
        const token = getToken();
        return api.delete(`${DELETE_BASE_API_URL}/${projectId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            } 
        });
    }

    GetTitles(email) {
        // const token = getToken();
        return api.get(`${PROJECT_BASE_API_URL}?email=${email}`,{
            // headers: {
            //     Authorization: `Bearer ${token}`
            // } 
        });
    }
    

    GetTitles2(email) {
        // const token = getToken();
        return api.get(`${PROJECT2_BASE_API_URL}?email=${email}`,{
            // headers: {
            //     Authorization: `Bearer ${token}`
            // } 
        });
    }

    GetIdTitle(title) {
        // const token = getToken();
        return api.get(`http://localhost:8080/api/v1/project/id?title=${title}`,{
            // headers: {
            //     Authorization: `Bearer ${token}`
            // } 
        });
    }

    UpdateProject(projectId) {
      
        return `/creer-projet/${projectId}`;
    }
    UpdateProject2(projectId) {
        return `/creer-projet2/${projectId}`;
    }

    DeposerProject(projectId) {
        const token = getToken();
        return api.post(`${DEPOSER_BASE_API_URL}/${projectId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            } 
        });
    }

    Redirection() {
        return `/creer-projet/`;
    }
    Redirection2() {
        return `/creer-projet2/`;
    }
}

export default new EspaceProject();
