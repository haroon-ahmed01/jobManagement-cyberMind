import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';


const jobService = {
  getJobs: async (filters = {}) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/jobs`, { params: filters });
      return res.data;
    } catch (err) {
      throw err;
    }
  },
  
 createJob: async (jobData) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/jobs`, jobData);
      return res.data;
    } catch (err) {
      throw err;
    }
  },
};


export default jobService;