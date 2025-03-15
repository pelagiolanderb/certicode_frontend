import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function VerifyEmail({ status }) {
  const [processing, setProcessing] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Extract the `id` and `hash` from the URL (if present)
  const id = searchParams.get("id");
  const hash = searchParams.get("hash");

  // Automatically verify the email if `id` and `hash` are present in the URL
  useEffect(() => {
    if (id && hash) {
      verifyEmail();
    }
  }, [id, hash]);

  // Function to verify the email
  const verifyEmail = async () => {
    setProcessing(true);
    try {
      // Request to get CSRF cookie (if required for session-based auth)
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      // Request to verify the email
      const response = await axios.get(
        `http://localhost:8000/api/email/verify/${id}/${hash}`,
        {
          headers: {
            accept: "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Verify Email Response:", response.data); // Debugging: Log the response

      // Check if the response contains a token and redirect_url
      if (response.data.token && response.data.redirect_url) {
        // Store the token in localStorage
        localStorage.setItem("auth_token", response.data.token);

        // Debugging: Log the token
        console.log("Token stored:", localStorage.getItem("auth_token"));

        // Debugging: Log the redirect URL
        console.log("Redirect URL:", response.data.redirect_url);

        // Perform the redirect
        window.location.href = response.data.redirect_url;
      } else {
        // Handle case when the token or redirect_url is missing
        console.log(
          "No token or redirect_url in the response, failed to verify email."
        );
        setVerificationStatus("failed");
      }
    } catch (error) {
      console.error("Email verification failed", error);
      setVerificationStatus("failed");
    } finally {
      setProcessing(false);
    }
  };

  // Function to resend the verification email
  const handleResendVerificationEmail = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      const response = await axios.post(
        "http://localhost:8000/api/email/verification-notification",
        {},
        {
          headers: {
            accept: "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setVerificationStatus("resent");
      }
    } catch (error) {
      console.error("Failed to resend verification email", error);
    } finally {
      setProcessing(false);
    }
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      const response = await axios.post(
        "http://localhost:8000/logout",
        {},
        {
          headers: {
            accept: "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col gap-6">
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Thanks for signing up! Before getting started, could you
                    verify your email address by clicking on the link we just
                    emailed to you? If you didn't receive the email, we will
                    gladly send you another.
                  </div>

                  {verificationStatus === "resent" && (
                    <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                      A new verification link has been sent to your email
                      address.
                    </div>
                  )}

                  {verificationStatus === "failed" && (
                    <div className="mb-4 text-sm font-medium text-red-600 dark:text-red-400">
                      Email verification failed. Please try again.
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={handleResendVerificationEmail}
                    disabled={processing}
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    {processing ? "Sending..." : "Resend Verification Email"}
                  </button>

                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-600 underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
