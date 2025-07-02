'use client';
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { ClipLoader } from "react-spinners";
import { FiLogOut } from "react-icons/fi";
import React from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = React.useState(false);

  async function logout() {
    try {

      setIsLoading(true);
      const response = await axios.get("/api/users/logout");
      console.log("Response:", response.data);
      setIsLoading(false);
      toast.success("Logout successful");

    } catch (error) {
      console.error("Logout failed:", error); 
    }
  }
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-300">
      <div className="flex w-[850px] h-[80%] bg-white rounded-lg shadow-lg">
        <div className="h-[100%] w-1/10 bg-gray-200 rounded-l-lg"></div>
        <div className="h-[100%] w-8/10 bg-white rounded-r-lg flex flex-col">
          <div className="bg-gray-300 relative h-[10%] w-full">
            <button
              className={`absolute right-5 top-3 w-[160px] h-[40px]  bg-blue-500 rounded-2xl flex items-center ${
                isLoading ? "cursor-not-allowed opacity-50" : "bg-blue-500"
              }`}
              onClick={logout}
            >
              {isLoading ? (
                <div className="flex w-full h-full items-center justify-center gap-2">
                  <ClipLoader size={20} color="#fff" />
                  Loading...
                </div>
              ) : (
                <>
                  <FiLogOut className="h-[40px] w-[25%] p-1 rounded-lg bg-white text-blue-500 font-bold drop-shadow-[4px_0px_6px_rgba(0,0,0,0.25)]" />
                  <span className=" text-white font-bold text-md ml-5">
                    LOGOUT
                  </span>
                </>
              )}
            </button>
          </div>
          <div className="h-[90%] w-[100%]  rounded-r-lg  flex justify-center items-center flex-col">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt=""
              className="h-[150px] w-[150px] rounded-2xl"
            />
            <div>
              <div className="flex items-center justify-center mt-10">
                <FaUser className="h-12 w-12 p-3  border border-r-0 bg-gray-50 text-gray-600 rounded-l-xl" />
                <p className="h-12 w-[200px] text-xl border border-l-0 rounded-r-xl px-4 py-2  flex">
                  User Name
                </p>
              </div>
              <div className="flex items-center justify-center mt-2">
                <MdEmail className="h-12 w-12 p-3  border border-r-0 bg-gray-50 text-gray-600 rounded-l-xl" />
                <p className="h-12 w-[200px] text-xl border border-l-0 rounded-r-xl px-4 py-2  flex">
                  User Email
                </p>
              </div>
              <div className="flex items-center justify-center mt-2">
                <RiLockPasswordLine className="h-12 w-12 p-3  border border-r-0 bg-gray-50 text-gray-600 rounded-l-xl" />
                <p className="h-12 w-[200px] text-xl border border-l-0 rounded-r-xl px-4 py-2  flex">
                  ********
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[100%] w-1/10 bg-gray-200 rounded-r-lg"></div>
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
    </div>
  );
}
