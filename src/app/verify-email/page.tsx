'use client';
import { MdMarkEmailUnread } from "react-icons/md";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

export default function VerifyEmailPage() {
    const router = useRouter();
    const [isVerified, setIsVerified] = React.useState(false);
    
    useEffect(()=>{
        const callBackend = setInterval(async ()=>{
            try {
                const response = await axios.get("/api/users/verify-email");

                if(!response.data.success) {
                    return console.log("User not verified yet");
                }
                toast.success("User verified successfully");
                setIsVerified(true);
                router.push("/login");

            } catch (error) {
                return console.log("Error verifying email:", error);
            }
        }, 5000)

        return () => clearInterval(callBackend);
    }, [])

    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gray-200">
        <div className="h-[600px] w-[600px] bg-white rounded-2xl shadow-2xl flex flex-col items-center justify-center">
          <MdMarkEmailUnread className="text-9xl text-blue-500 mx-auto drop-shadow-lg" />
          <h1 className="text-2xl font-bold mt-10">Check your email</h1>
          <p className="text-gray-600 text-lg mt-4 mx-10 text-center">
            We’ve sent a verification link to your email. Please click on the
            link to verify your account and continue.
          </p>
          <p className="mt-4 text-sm text-gray-500 flex mb-10">
            Don't Receved Email?
             <span className="text-blue-600 cursor-pointer hover:underline">
              Try again
            </span>
          </p>
        </div>
        <Toaster position="top-right" />
      </div>
    );
}