import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const jobService = {
  getJobs: async (filters = {}) => {
    try {
      const res = await axios.get(API_BASE_URL, { params: filters });
      return res.data;
    } catch (err) {
      throw err;
    }
  },
  
 createJob: async (jobData) => {
    try {
      const res = await axios.post(API_BASE_URL, jobData);
      return res.data;
    } catch (err) {
      throw err;
    }
  },
};


export default jobService;