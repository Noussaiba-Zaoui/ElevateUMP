
import api from "../api/axios";

const getUserRoles = async (email) => {

  try {
    const response = await api.get('/api/v1/auth/getUserRoles', {
      params: {
        userEmail: email,
      },
    });
    console.log(response.data);
    return response.data.map(role => role.role);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getUserRoles;