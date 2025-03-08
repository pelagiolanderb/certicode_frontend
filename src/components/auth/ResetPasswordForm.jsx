import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import axios from "axios";
import InputError from "../../pages/UiElements/InputError";

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    token: token,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailFromParams = queryParams.get("email");

    if (emailFromParams) {
      setEmail(emailFromParams);
      setFormData((prevFormData) => ({
        ...prevFormData,
        email: emailFromParams,
      }));
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setErrors({
      email: "",
      password: "",
      password_confirmation: "",
    });

    if (formData.password !== formData.password_confirmation) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password_confirmation: "Passwords do not match.",
      }));
    }

    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      const response = await axios.post(
        "http://localhost:8000/api/reset-password",
        {
          token: formData.token,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
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
        localStorage.setItem("auth_token", response.data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Password reset failed", error);
      setLoading(false);

      if (error.response && error.response.status === 422) {
        const backendErrors = error.response.data.errors;
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: backendErrors.email ? backendErrors.email[0] : "",
          password: backendErrors.password ? backendErrors.password[0] : "",
        }));
      } else if (error.response && error.response.status === 401) {
        const errorMessage =
          error.response.data.message || "Invalid credentials";
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: errorMessage,
          password: errorMessage,
        }));
      } else {
        alert("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Password Reset
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and new password to reset your account.
            </p>
          </div>
          <div>
            <form>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <InputError message={errors.email} />
                </div>
                <div>
                  <Label>
                    New Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          password: e.target.value,
                        })
                      }
                    />
                    {!formData.password && errors.password && (
                      <InputError message="Password is required" />
                    )}
                    {formData.password &&
                      errors.password &&
                      errors.password !== "The password field is required." && (
                        <InputError message={errors.password} />
                      )}
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                {/* <!-- Confirm Password --> */}
                <div>
                  <Label>
                    Confirm Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Confirm your password"
                      id="password_confirmation"
                      name="password_confirmation"
                      type={showPassword ? "text" : "password"}
                      value={formData.password_confirmation}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          password_confirmation: e.target.value,
                        })
                      }
                    />

                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>

                <div>
                  <Button
                    onClick={handleSubmit}
                    type="submit"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
