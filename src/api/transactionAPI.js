import api from "./api";
import axios from "axios";

const getCSRFToken = async () => {
  await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/sanctum/csrf-cookie`, {
    withCredentials: true,
    withXSRFToken: true,
  });
};

export const fetchTransactions = async () => {
  try {
    await getCSRFToken();
    const response = await api.get("/transactions");

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const createTransaction = async (data) => {
  try {
    await getCSRFToken();
    await api.post("/create-transaction", data, {
      headers: {
        Accept: "application/json",
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};
