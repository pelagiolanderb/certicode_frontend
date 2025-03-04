import axios from "axios";

const API_Base_URL = "http://localhost:8000/api";

// Create an axios instance with default settings
const api = axios.create({
  baseURL: API_Base_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});

const getCSRFToken = async () => {
  await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
    withCredentials: true,
    withXSRFToken: true,
  });
};

// export const createParticipant = async (seminarId, guestData = null) => {
//     try {
//       await getCSRFToken();
      
//       // Fetch the logged-in user (if available)
//       const userResponse = await api.get("/user"); // Adjust the endpoint to get the logged-in user
//       const user = userResponse.data; // Assuming the backend returns user details
  
//       const data = {
//         seminar_id: seminarId,
//         user_id: user ? user.id : null, // If logged in, set user_id
//         guest_id: user ? null : guestData?.guest_id, // If not logged in, send guest data
//       };
  
//       const response = await api.post("/add-participant", data, {
//         headers: {
//           accept: "application/json",
//         },
//       });
  
//       return response.data;
//     } catch (error) {
//       console.error("Error joining:", error);
//       throw error;
//     }
//   };

export const createParticipant = async (seminarId, guestData = null) => {
    try {
      await getCSRFToken();
      

      let user = null;
      try {
        const userResponse = await api.get("/user"); 
        user = userResponse.data; 
      } catch (error) {
        console.warn("No logged-in user found, proceeding as guest.");
      }

      const data = {
        seminar_id: seminarId,
        user_id: user ? user.id : null, 
        guest_id: user ? null : guestData?.guest_id, 
      };

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
// Fetch all participants
export const fetchParticipants = async () => {
  try {
    const response = await api.get("/participants");
    return response.data;
  } catch (error) {
    console.error("Error fetching participants:", error);
    return [];
  }
};

// Send certificate request
// console.log("Requesting certificate for participantId:", participantId);
export const sendCertificate = async (participantId) => {
  try {
    await getCSRFToken();
    const response = await api.get(`/certificate/${participantId}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending certificate:", error);
    throw error;
  }
};

// // ✅ Add createParticipant function
// export const createParticipant = async (participantData) => {
//   try {
//     const response = await api.post("/participants", participantData);
//     return response.data;
//   } catch (error) {
//     console.error("Error creating participant:", error);
//     throw error;
//   }
// };
