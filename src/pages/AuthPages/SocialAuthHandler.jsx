import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";

export default function SocialAuthHandler() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      try {
        localStorage.setItem("auth_token", token);

        console.log("Token stored:", token);
        navigate("/dashboard");
      } catch (error) {
        console.error("Error storing token:", error);
        window.location.href = "/";
      }
    } else {
      console.error("Token is missing in the URL.");
      window.location.href = "/";
    }
  }, [searchParams, navigate]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <BeatLoader />
    </div>
  );
}
