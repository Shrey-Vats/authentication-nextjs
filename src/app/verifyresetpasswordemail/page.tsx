"use client";

import { MdMarkEmailUnread } from "react-icons/md";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

export default function VerifyEmailPage() {
  const router = useRouter();

  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const redirectToLogin = () => {
    router.push("/profile");
  };

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/resetpassword", { token });

      if (!response.data.success) {
        setError(response.data.message || "Verification failed.");
        console.log(response.data.message)
        return;
      }

      setIsVerified(true);
      toast.success("Email verified successfully!");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
      toast.error("Verification failed.");
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    if (urlToken) {
      setToken(urlToken);
      console.log(urlToken)
    } else {
      setLoading(false);
      setError("Token missing in URL.");
    }
  }, []);

  useEffect(() => {
    if (token) verifyUserEmail();
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-xl p-8 bg-white rounded-2xl shadow-2xl text-center flex flex-col items-center">
        {loading ? (
          <>
            <MdMarkEmailUnread className="text-7xl text-blue-500 animate-pulse mb-4" />
            <h1 className="text-2xl font-bold mb-2">Verifying your email...</h1>
            <p className="text-gray-600">
              Please wait while we confirm your account.
            </p>
          </>
        ) : error ? (
          <>
            <FaTimesCircle className="text-6xl text-red-500 mb-4" />
            <h1 className="text-xl font-bold text-red-600">
              Verification Failed
            </h1>
            <p className="text-gray-600 mt-2">{error}</p>
            <button
              onClick={redirectToLogin}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              Go to Login
            </button>
          </>
        ) : isVerified ? (
          <>
            <FaCheckCircle className="text-6xl text-green-500 mb-4" />
            <h1 className="text-xl font-bold text-green-600">
              Email Verified!
            </h1>
            <p className="text-gray-600 mt-2">
              You can now log in to your account.
            </p>
            <button
              onClick={redirectToLogin}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              Go to Login
            </button>
          </>
        ) : (
          <>
            <MdMarkEmailUnread className="text-7xl text-blue-500 mb-4" />
            <h1 className="text-2xl font-bold">Check your email</h1>
            <p className="text-gray-600 mt-4">
              We’ve sent a verification link to your email. Click it to verify
              your account.
            </p>
            <p className="text-sm text-gray-500 mt-6">
              Didn’t get the email?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={redirectToLogin}
              >
                Try Again
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
