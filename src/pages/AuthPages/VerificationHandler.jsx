import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";

export default function VerificationHandler() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const id = searchParams.get("id");
      const hash = searchParams.get("hash");

      if (id && hash) {
        try {
          await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
            withCredentials: true,
          });

          const response = await axios.get(
            `http://localhost:8000/api/email/verify/${id}/${hash}`,
            {
              headers: {
                accept: "application/json",
              },
              withCredentials: true,
            }
          );

          console.log("Response:", response.data);

          if (response.data.token) {
            localStorage.setItem("auth_token", response.data.token);
            console.log("Token stored:", response.data.token);

            navigate("/dashboard");
          }
        } catch (error) {
          console.error("Email verification failed", error);
          navigate("/");
        }
      } else {
        console.error("ID or hash is missing in the URL.");
        navigate("/");
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <BeatLoader />
    </div>
  );
}
