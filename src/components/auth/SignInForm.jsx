import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import axios from "axios";
import InputError from "../../pages/UiElements/InputError";
import useApiService from "../../api/useApiService";

const GOOGLE_AUTH_URL = `http://127.0.0.1:8000/api/auth/redirection/google`;
const Facebook_AUTH_URL =
  "https://36e7-136-158-78-104.ngrok-free.app/api/auth/redirection/facebook";

const handleGoogleLogin = ($url) => (e) => {
  e.preventDefault();
  console.log("Redirecting to Google login");
  window.location.href = $url;
};

const handleFacebookLogin = ($url) => (e) => {
  e.preventDefault();
  window.location.href = $url;
};

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    isUnauthorized: "",
  });

  const { loading, get, post } = useApiService();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      email: "",
      password: "",
    });

    Object.keys(formData).forEach((key) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email) && formData.email)
        setErrors((prev) => ({
          ...prev,
          email: "Email is not valid.",
        }));
      setErrors((prev) => ({
        ...prev,
        [key]: !formData[key] && "required",
      }));
    });

    if (formData.email && formData.password) {
      try {
        await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
          withCredentials: true,
        });

        const data = await post("/auth/login", formData);

        if (data) {
          console.log(data);
          if (data.isVerified) {
            localStorage.setItem("auth_token", data.access_token);
            localStorage.setItem("role", data.current_user.users?.role);
            localStorage.setItem("user_id", data.current_user.users?.id);
            localStorage.setItem(
              "current_user",
              JSON.stringify(data.current_user)
            );

            let role = data.current_user?.users?.role;

            navigate(role === "user" ? "/" : "/dashboard");
          } else {
            setErrors((prev) => ({
              ...prev,
              email: "Please verify your email.",
            }));
          }
        }
      } catch (error) {
        switch (error.status) {
          case 401:
            setErrors((prev) => ({
              ...prev,
              isUnauthorized:
                "This credentials is unauthorized, please double check your email or password.",
            }));
            break;
          case 422:
            console.log(error);
            break;
          default:
            break;
        }
      }
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("auth_token");
  //   if (token) {
  //     console.log("nag true");
  //     navigate("/");
  //   }
  // }, [navigate]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   setErrors({
  //     email: "",
  //     password: "",
  //   });

  //   try {
  //     await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
  //       withCredentials: true,
  //     });

  //     const response = await axios.post(
  //       "http://localhost:8000/api/auth/login",
  //       {
  //         email: formData.email,
  //         password: formData.password,
  //       },
  //       {
  //         headers: {
  //           accept: "application/json",
  //         },
  //         withCredentials: true,
  //         withXSRFToken: true,
  //       }
  //     );

  //     if (response.status === 200) {
  //       console.log(response.data);
  //       if (response.data && response.data.isVerified) {
  //         const user = await axios.get("http://localhost:8000/api/auth/me", {
  //           headers: {
  //             Authorization: "Bearer " + response.data.access_token,
  //           },
  //           withCredentials: true,
  //         });
  //         localStorage.setItem("auth_token", response.data.access_token);
  //         localStorage.setItem("role", user.data[0].role);
  //         localStorage.setItem("user_id", JSON.stringify(user.data[0].id));
  //         localStorage.setItem(
  //           "current_user",
  //           JSON.stringify(response.data.current_user)
  //         );

  //         if (user.data[0].role && user.data[0].role === "user") navigate("/");
  //         else navigate("/dashboard");
  //       } else {
  //         setErrors((prevErrors) => ({
  //           ...prevErrors,
  //           email: "Please verify your email first.",
  //         }));
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error during user login:", error);
  //     if (error.status === 401) {
  //       setErrors({ ...errors, isUnauthorized: true });
  //     }
  //     if (error.response && error.response.status === 422) {
  //       const backendErrors = error.response.data.errors;
  //       setErrors((prevErrors) => ({
  //         ...prevErrors,
  //         email: backendErrors.email ? backendErrors.email[0] : "",
  //         password: backendErrors.password ? backendErrors.password[0] : "",
  //       }));
  //     } else if (error.response && error.response.status === 401) {
  //       const errorMessage =
  //         error.response.data.message || "Invalid credentials";
  //       setErrors((prevErrors) => ({
  //         ...prevErrors,
  //         email: errorMessage,
  //         // password: errorMessage,
  //       }));
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <div
              // className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5"
              className={"grid grid-cols-1 gap-3"}
            >
              <button
                onClick={handleGoogleLogin(GOOGLE_AUTH_URL)}
                className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.7511 10.1944C18.7511 9.47495 18.6915 8.94995 18.5626 8.40552H10.1797V11.6527H15.1003C15.0011 12.4597 14.4654 13.675 13.2749 14.4916L13.2582 14.6003L15.9087 16.6126L16.0924 16.6305C17.7788 15.1041 18.7511 12.8583 18.7511 10.1944Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M10.1788 18.75C12.5895 18.75 14.6133 17.9722 16.0915 16.6305L13.274 14.4916C12.5201 15.0068 11.5081 15.3666 10.1788 15.3666C7.81773 15.3666 5.81379 13.8402 5.09944 11.7305L4.99473 11.7392L2.23868 13.8295L2.20264 13.9277C3.67087 16.786 6.68674 18.75 10.1788 18.75Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.10014 11.7305C4.91165 11.186 4.80257 10.6027 4.80257 9.99992C4.80257 9.3971 4.91165 8.81379 5.09022 8.26935L5.08523 8.1534L2.29464 6.02954L2.20333 6.0721C1.5982 7.25823 1.25098 8.5902 1.25098 9.99992C1.25098 11.4096 1.5982 12.7415 2.20333 13.9277L5.10014 11.7305Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M10.1789 4.63331C11.8554 4.63331 12.9864 5.34303 13.6312 5.93612L16.1511 3.525C14.6035 2.11528 12.5895 1.25 10.1789 1.25C6.68676 1.25 3.67088 3.21387 2.20264 6.07218L5.08953 8.26943C5.81381 6.15972 7.81776 4.63331 10.1789 4.63331Z"
                    fill="#EB4335"
                  />
                </svg>
                Sign in with Google
              </button>
              <button
                onClick={handleFacebookLogin(Facebook_AUTH_URL)}
                // className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
                className={"hidden"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.88v-6.988H7.898V12h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.096 0 2.24.195 2.24.195v2.465H15.56c-1.373 0-1.798.85-1.798 1.722V12h3.05l-.488 2.892h-2.562v6.988C18.344 21.128 22 16.991 22 12z" />
                </svg>
                Sign in with Facebook
              </button>
            </div>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                  Or
                </span>
              </div>
            </div>
            <form>
              <div className="space-y-6">
                {errors.isUnauthorized && (
                  <span className="text-red-500 text-xs">
                    {errors.isUnauthorized}
                  </span>
                )}
                <div>
                  <Label htmlFor="email">
                    Email{" "}
                    {errors.email && (
                      <span className="text-red-500 ml-2 capitalize">
                        ({errors.email})
                      </span>
                    )}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    className={`${
                      errors.email && "border-red-600 dark:border-red-600"
                    }`}
                    placeholder="JohnDoe@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>
                    Password{" "}
                    {errors.password && (
                      <span className="text-red-500 ml-2 capitalize">
                        ({errors.password})
                      </span>
                    )}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      id="password"
                      name="password"
                      className={`${
                        errors.password && "border-red-600 dark:border-red-600"
                      }`}
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 cursor-pointer right-4 top-1/4"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <Button
                    onClick={handleSubmit}
                    type="submit"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  to="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
