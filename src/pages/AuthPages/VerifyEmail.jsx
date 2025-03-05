// import { Button } from "@/Components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
// import { cn } from "@/lib/utils";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function VerifyEmail({ status }) {
  const [process, processing] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    processing(true); // Set processing state to true
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });
      const response = await axios.post(
        "http://localhost:8000/email/verification-notification",
        {},
        {
          headers: {
            accept: "application/json",
          },
          withCredentials: true,
          withXSRFToken: true,
        }
      );
      if (response.status === 200) {
        // Handle success (e.g., show a success message)
      }
    } catch (error) {
      console.error(error);
    } finally {
      processing(false); // Reset processing state
    }
  };

  const handleLogout = async () => {
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
        withXSRFToken: true,
      }
    );
    if (response.status === 200) {
      navigate("/");
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
                        verify your email address by clicking on the link we
                        just emailed to you? If you didn't receive the email, we
                        will gladly send you another.
                      </div>

                      {status === "verification-link-sent" && (
                        <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                          A new verification link has been sent to the email
                          address you provided during registration.
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <form onSubmit={handleSubmit}>
                        <div className="mt-4 flex items-center justify-between">
                          <button disabled={processing}>
                            Resend Verification Email
                          </button>
                        </div>
                      </form>
                      <form onSubmit={handleLogout}>
                        <div className="rounded-md cursor-pointer text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800">
                          Logout
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </form>
        </div>
      </div>
    </div>
  );
}
