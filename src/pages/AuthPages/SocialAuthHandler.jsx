import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";
import useApiService from "../../api/useApiService";

export default function SocialAuthHandler() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loading, get } = useApiService();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      try {
        const currentUser = async () => {
          const data = await get("/auth/me", {
            headers: {
              Authorization: "Bearer " + token,
            },
            // withCredentials: true,
          });

          if (data) {
            localStorage.setItem("auth_token", token);
            localStorage.setItem("user_id", data[0].id);
            localStorage.setItem("role", data[0].role);
            localStorage.setItem(
              "current_user",
              JSON.stringify({ users: data[0] })
            );
            navigate("/");
          }
        };
        currentUser();
      } catch (error) {
        console.error("Error storing token:", error);
        window.location.href = "/";
      }
    } else {
      console.error("Token is missing in the URL.");
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {loading && <BeatLoader />}
    </div>
  );
}
