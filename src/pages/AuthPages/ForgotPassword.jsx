import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputError from "../UiElements/InputError";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({
    email: "",
  });
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setErrors({
      email: "",
    });

    setSuccessMessage("");

    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });
      const response = await axios.post(
        "http://localhost:8000/api/forgot-password",
        {
          email: formData.email,
        },
        {
          headers: {
            accept: "application/json",
          },
          withCredentials: true,
          withXSRFToken: true,
        }
      );
      if (response.status === 200) {
        setSuccessMessage("Password reset link sent to your email.");
      }
    } catch (error) {
      console.error("Error during password reset request:", error);
      if (error.response) {
        if (error.response.status === 422) {
          const backendErrors = error.response.data.errors;
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: backendErrors.email ? backendErrors.email[0] : "",
          }));
        } else if (error.response.status === 401) {
          const errorMessage =
            error.response.data.message || "Invalid credentials";
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: errorMessage,
          }));
        } else {
          alert("An unexpected error occurred. Please try again later.");
        }
      } else {
        alert("Network error. Please check your internet connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      email: e.target.value,
    });

    // Clear success message when the user starts typing again
    if (successMessage) {
      setSuccessMessage("");
    }
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col gap-6">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  Forgot Password
                </div>
                <h1>Enter your email below to reset your password</h1>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="JohnDoe@gmail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {successMessage && (
                    <div className="mb-2 text-sm text-green-600">
                      {successMessage}
                    </div>
                  )}
                  <InputError message={errors.email} />
                </div>

                <div className="flex justify-between items-center">
                  <button
                    type="submit"
                    disabled={processing}
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    {loading ? "Sending..." : "Send Verification Email"}
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
