"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { makeLoginRequest } from "../../utils/api"; // Adjust the import path based on your project structure

interface LoginInfo {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "",
  });

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-gradient-to-br from-[#565f89] to-[#414868]">
      <div className="flex flex-col bg-[#1a1b26] p-4 rounded-lg gap-4 w-[530px]">
        <h1 className="text-white text-xl font-bold border-b-2 border-b-white pb-2">
          Log In
        </h1>
        <input
          className="w-29 h-8 ps-3 rounded-sm text-sm"
          type="text"
          value={loginInfo.email}
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, email: e.target.value })
          }
          placeholder="Email"
        />
        <input
          className="w-29 h-8 ps-3 rounded-sm text-sm"
          type="password"
          value={loginInfo.password}
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, email: e.target.value })
          }
          placeholder="Password"
        />
        <button className="self-start bg-[#9ece6a] hover:bg-[#628042] px-4 py-1 rounded-md">
          Login
        </button>
      </div>
    </div>
  );
}
