import api from "./api";
import axios from "axios";

const getCSRFToken = async () => {
  await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
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
