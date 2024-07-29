import axios from "axios";
import { getToken } from "./tokenService";
import api from "../api/axios";

const PROJECT_BASE_API_URL = 'http://localhost:8080/api/v1/participant/Project';
const UPDATE_BASE_API_URL = 'http://localhost:8080/api/v1/participant/Project';


class CreateProject {
    createProject(formData) {
        const token = getToken();
       
        return api.post(PROJECT_BASE_API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
              
                Authorization: `Bearer ${token}`
                
            }
        });
        
    }

    checkExistingProject(title) {
        try {
            const token = getToken();
            return  api.get(`${PROJECT_BASE_API_URL}/checkTitle/${title}`,{
                headers: {
                   
                    Authorization: `Bearer ${token}`
                    
                }
            });
            
        } catch (error) {
            console.error('Error checking existing project:', error);
            throw error;
        }
    }
    updateProject(projectId, formData) {
        const token = getToken();
     
        return api.put(`${UPDATE_BASE_API_URL}/${projectId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
                
            }
        });
      }
    checkExistingProject2(title, projectId) {
        try {
            const token = getToken();
            return  api.get(`${PROJECT_BASE_API_URL}/checkTitle/${title}/${projectId}`,{
                headers: {
                   
                    Authorization: `Bearer ${token}`
                    
                }
            });
        } catch (error) {
            console.error('Error checking existing project:', error);
            throw error;
        }
    }
    getProjectDetails(projectId) {

        try {
            const token = getToken();
            return api.get(`${PROJECT_BASE_API_URL}/${projectId}`,{
                headers: {
                   
                    Authorization: `Bearer ${token}`
                }
            });
            
        } catch (error) {
            console.error('Error fetching project details:', error);
            throw error;
        }
    }
}

export default new CreateProject();