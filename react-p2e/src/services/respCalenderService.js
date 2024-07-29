import api from "../api/axios";
import { getToken } from "./tokenService";



const confirm = async (email, responsibleName, title) => {
  try {
    const token = getToken();
    await api.post('/api/v1/respCal/confirm', null, {
      params: {
        email: email,
        responsibleName: responsibleName,
        projectTitle: title
      },
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(`Email sent to ${responsibleName} with email ${email} for project ${title}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default {confirm};
