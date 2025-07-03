'use client';
import { Toaster, toast } from "react-hot-toast";
import {MdMarkEmailUnread} from 'react-icons/md'
import {FaTimesCircle} from 'react-icons/fa'
import {FaCheckCircle} from 'react-icons/fa'
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import axios from "axios";

export default function resetPassword() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [isVerified, setIsVerified] = useState(false)
    const [email, setEmail] = useState("")

    const redirectToLogin = () => {
        
    }

    const sumbitMail = async  () => {
        try {
            setLoading(true)
            if (email.length == 0) setError("EMAIL-LENGTH");

            const response = await axios.post(
              "/api/users/sendResetPasswordEmail",
              { email }
            );

            if(!response.data.success){
                console.log("there a error")
            }

            
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

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
            <h1 className="text-2xl font-bold">Enter Your Email</h1>
            <p className="text-gray-600 mt-4">
              Enter Email here to send reset-password mail on your email
            </p>
            <div className=" h-[40%] w-full flex justify-center items-center ">
              <MdEmail className="h-10 w-10 p-1 border border-r-0 rounded-l-lg text-gray-800 bg-gray-200" />
              <input
                type="email"
                className={
                  error == "EMAIL-LENGTH"
                    ? `w-full h-[40px] px-4 py-1 text-lg font-semibold  border border-l-0 outline-none`
                    : "w-full h-[40px] px-4 py-1 text-lg font-semibold  border border-l-0 outline-none outline-red-700"
                }
                placeholder="Enter Your Email here"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <button onClick={sumbitMail}>
                <FiSend className="text-white bg-blue-600 p-2 rounded-r-lg h-10 w-10 cursor-pointer" />
              </button>
            </div>
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
