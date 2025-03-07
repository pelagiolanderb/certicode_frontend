import api from "./api";
import axios from "axios";

const getCSRFToken = async () => {
  await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/sanctum/csrf-cookie`, {
    withCredentials: true,
    withXSRFToken: true,
  });
};

export const fetchCertificateTemplates = async () => {
  try {
    await getCSRFToken();
    const response = await api.get("/templates");
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching certificate templates:", error);
    return [];
  }
};

export const uploadCertificateTemplate = async (formData) => {
  try {
    await getCSRFToken();
    const response = await api.post("/templates", formData,{
      headers: {
        accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading template:", error);
    throw error;
  }
};

export const updateCertificateTemplate = async (id, formData) => {
  try {
    await getCSRFToken();
    const response = await api.post(`/templates/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating template:", error);
    throw error;
  }
};

export const deleteCertificateTemplate = async (id) => {
  try {
    await getCSRFToken();
    const response = await api.delete(`/templates/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting template:", error);
    throw error;
  }
};

