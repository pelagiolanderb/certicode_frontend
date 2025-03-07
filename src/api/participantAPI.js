import api from "./api";
import axios from "axios";
import { createTransaction } from "./transactionAPI";

const getCSRFToken = async () => {
  await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/sanctum/csrf-cookie`, {
    withCredentials: true,
    withXSRFToken: true,
  });
};

export const createParticipant = async (seminarId, guest_id = null) => {
  try {
    await getCSRFToken();

    let user_id = localStorage.getItem("user_id");

    const data = {
      seminar_id: seminarId,
      user_id: user_id ? user_id : null,
      guest_id: user_id ? null : guest_id,
    };

    // await createTransaction({seminar_id: seminarId, participant_id: 1, isPaid: false})

    const response = await api.post("/add-participant", data, {
      headers: {
        accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error joining:", error);
    throw error;
  }
};

export const fetchParticipants = async () => {
  try {
    await getCSRFToken();
    const response = await api.get("/participants");
    return response.data;
  } catch (error) {
    console.error("Error fetching participants:", error);
    return [];
  }
};

export const sendCertificate = async (participantId) => {
  try {
    await getCSRFToken();
    const response = await api.get(`/certificate/${participantId}`, {
      headers: {
        accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error sending certificate:", error);
    throw error;
  }
};
