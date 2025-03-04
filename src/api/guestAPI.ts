import axios from "axios";

const API_Base_URL = "http://localhost:8000/api";

// Create an axios instance with default settings
const api = axios.create({
  baseURL: API_Base_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  withXSRFToken: true, // Ensures cookies are sent with requests
});

// Function to fetch CSRF token
const getCSRFToken = async () => {
  await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
    withCredentials: true,
    withXSRFToken: true,
  });
};

// Function to get guests
export const getGuests = async () => {
  try {
    const response = await api.get("/guests");
    return response.data;
  } catch (error) {
    console.error("Error fetching guests:", error);
  }
};

// Function to add a guest with CSRF token handling
// export const addGuest = async (guest) => {
//   try {
//     await getCSRFToken(); // Ensure CSRF token is set before sending a request
//     const response = await api.post("/create-guest", guest, {
//       headers: {
//         accept: "application/json",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error adding guest:", error);
//   }

// };
export const addGuest = async (guest) => {
  try {
    await getCSRFToken();
    const response = await api.post("/create-guest", guest, {
      headers: { accept: "application/json" },
    });

    if (response.data && response.data.guest_id) {
      await getCSRFToken();
      await api.post("/add-participant", {
        seminar_id: guest.seminar_id,
        guest_id: response.data.guest_id,
        
      },
      {
        headers: { accept: "application/json" },
      }
    );
    }

    return response.data;
  } catch (error) {
    console.error("Error adding guest:", error);
  }
};
