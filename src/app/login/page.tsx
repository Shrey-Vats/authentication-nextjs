"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { on } from "events";

export default function LoginPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {};

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-300">
      <div className="flex w-[850px] h-[80%] bg-white rounded-lg shadow-lg">
        <div className="h-[100%] w-3/5  rounded-r-lg ">
          <form
            onSubmit={onLogin}
            className="flex flex-col justify-center items-center p-10"
          >
            <div className="flex justify-center items-center w-[100%] mt-10">
              <hr className="w-full bg-gray-900 px-4" />
              <h2 className="text-2xl font-bold px-4">Login</h2>
              <hr className="w-full bg-gray-900 px-4" />
            </div>
            <div className="flex mt-4">
              <MdEmail className="h-12 w-12 p-2 border border-r-0 rounded-l-lg bg-gray-100 text-gray-600" />
              <input
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Enter your email"
                className="w-full h-12 border border-l-0 px-4 py-2 outline-none rounded-r-lg"
              />
            </div>
            <div className="flex mt-4">
              <RiLockPasswordLine className="h-12 w-12 p-2 border border-r-0 rounded-l-lg bg-gray-100 text-gray-600" />
              <input
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Enter your password"
                className="w-full h-12 px-4 py-2 border border-l-0 outline-none rounded-r-lg"
              />
            </div>
            <button
              type="submit"
              className="bg-red-950 px-4 py-2 w-[200px] h-[40px] mt-8 rounded-lg text-white font-bold pointer"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center mt-2 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href={"/signup"}
              className="text-blue-700 font-semibold cursor-pointer hover:underline"
            >
              Sign Up
            </Link>
          </p>
          <div className="mt-6 mb-2 flex items-center justify-center text-gray-500">
            <hr className="w-full border-gray-300" />
            <span className="px-3 text-sm">OR</span>
            <hr className="w-full border-gray-300" />
          </div>
          <div className="flex gap-5 w-full h-[20%] items-center justify-center">
            {/* Google Button */}
            <div className="flex items-center gap-2 justify-center h-[50px] px-5 border-2 rounded-lg cursor-pointer transition-all duration-300 hover:border-blue-900  hover:shadow-lg hover:scale-3d ">
              <FaGoogle className="w-6 h-6 text-blue-600" />
              <span className="font-medium text-gray-700">Google</span>
            </div>

            {/* GitHub Button */}
            <div className="flex items-center gap-2 justify-center h-[50px] px-5 border rounded-lg cursor-pointer transition-all duration-300 hover:border-blue-900  hover:shadow-lg hover:scale-3d">
              <FaGithub className="w-6 h-6 text-gray-900" />
              <span className="font-medium text-gray-800">GitHub</span>
            </div>
          </div>
        </div>
        <div className="h-[100%] w-2/5 bg-gray-200 backdrop-blur-lg rounded-r-lg"></div>
      </div>
    </div>
  );
}
