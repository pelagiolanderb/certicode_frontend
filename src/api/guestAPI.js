import api from "./api"
import axios from "axios";
import { createParticipant } from "./participantAPI";

const getCSRFToken = async () => {
  await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/sanctum/csrf-cookie`, {
    withCredentials: true,
    withXSRFToken: true,
  });
};

export const getGuests = async () => {
  try {
    await getCSRFToken();
    const response = await api.get("/guests");
    return response.data;
  } catch (error) {
    console.error("Error fetching guests:", error);
  }
};

export const addGuest = async (guest) => {
  try {
    await getCSRFToken();
    const response = await api.post("/create-guest", guest, {
      headers: { accept: "application/json" },
    });

    if (response.status === 200) {
      await createParticipant(guest.seminar_id, response.data.guest_id);
    }

    return response.data;
  } catch (error) {
    console.error("Error adding guest:", error);
  }
};
