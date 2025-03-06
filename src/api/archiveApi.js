import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    accept: "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});

// Function to get CSRF token before making requests
const getCSRFToken = async () => {
  await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
    withCredentials: true,
    withXSRFToken: true,
  });
};



export const archiveSeminar = async (id) => {
  try {
    await getCSRFToken(); 
    const response = await api.post(`/seminars_archive/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error archiving seminar:", error);
    throw error;
  }
};


export const fetchArchivedSeminars = async () => {
  try {
    const response = await api.get("/archived_seminars");
    return response.data;
  } catch (error) {
    console.error("Error fetching archived seminars:", error);
    throw error;
  }
};


export const restoreSeminar = async (id) => {
    try {
      await getCSRFToken();
      const response = await api.post(`/restore_seminar/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error restoring seminar:", error);
      throw error;
    }
  };
  
  export const deleteArchivedSeminar = async (id) => {
    try {
      await getCSRFToken();
      const response = await api.delete(`/delete_archived_seminar/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting archived seminar:", error);
      throw error;
    }
  };
  
  export const archiveCertificateTemplate = async (id) => {
    try {
      await getCSRFToken();
      const response = await api.post(`/template_archive/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error archiving template:", error);
      throw error;
    }
  };

  export const fetchArchivedCertificateTemplates = async () => {
    try {
      const response = await api.get("/archived_templates");
      return response.data;
    } catch (error) {
      console.error("Error fetching archived templates:", error);
      throw error;
    }
  };
  
  export const restoreCertificateTemplate = async (id) => {
    try {
      await getCSRFToken();
      const response = await api.post(`/restore_template/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error restoring template:", error);
      throw error;
    }
  };
  
  export const deleteArchivedCertificateTemplate = async (id) => {
    try {
      await getCSRFToken();
      const response = await api.delete(`/delete_archived_template/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting archived template:", error);
      throw error;
    }
  };