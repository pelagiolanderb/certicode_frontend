import axios from 'axios';
import { useState } from 'react';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BACKEND_URL}/api`,
  withCredentials: true,
  withXSRFToken: true,
});

const useApiService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRequest = async (requestFunction) => {
    setLoading(true);
    setError(null);
    try {
      const response = await requestFunction();
      return response.data;
    } catch (err) {
      console.error('API request error:', err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    get: (endpoint, params = {}) => handleRequest(() => api.get(endpoint, params)),
    post: (endpoint, data) => handleRequest(() => api.post(endpoint, data)),
    put: (endpoint, data) => handleRequest(() => api.put(endpoint, data)),
    remove: (endpoint) => handleRequest(() => api.delete(endpoint)),
  };
};

export default useApiService;
