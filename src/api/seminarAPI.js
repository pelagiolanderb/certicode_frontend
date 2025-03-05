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
    const response = await api.post("/create-seminar", seminarData, {
      headers: {
        accept: "application/json",
      },
    });
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
