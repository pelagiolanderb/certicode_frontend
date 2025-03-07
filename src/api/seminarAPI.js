import api from "./api";
import axios from "axios";

const getCSRFToken = async () => {
  await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/sanctum/csrf-cookie`, {
    withCredentials: true,
    withXSRFToken: true,
  });
};

export const fetchSeminars = async () => {
  try {
    await getCSRFToken();
    const response = await api.get("/seminars");
    return response.data;
  } catch (error) {
    console.error("Error fetching seminars:", error);
    throw error;
  }
};

export const createSeminar = async (seminarData) => {
  try {
    await getCSRFToken();
    const response = await api.post("/create-seminar", seminarData);
    return response.data;
  } catch (error) {
    console.error("Error creating seminar:", error);
    throw error;
  }
};

export const updateSeminar = async (id, updatedData) => {
  try {
    await getCSRFToken();
    const response = await api.post(`/edit-seminar/${id}`, updatedData, {
      headers: {
        accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating seminar:", error);
    throw error;
  }
};

export const deleteSeminar = async (id) => {
  try {
    await getCSRFToken();
    const response = await api.delete(`/delete-seminar/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting seminar:", error);
    throw error;
  }
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
  