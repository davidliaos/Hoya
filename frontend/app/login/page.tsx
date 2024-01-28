"use client";
import React, { useState } from "react";
import { makeLoginRequest } from "../../utils/api"; // Adjust the import path based on your project structure
import { useRouter } from "next/navigation";

interface LoginInfo {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "",
  });

  const router = useRouter();

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
            setLoginInfo({ ...loginInfo, password: e.target.value })
          }
          placeholder="Password"
        />
        <button
          className="self-start bg-[#9ece6a] hover:bg-[#628042] px-4 py-1 rounded-md"
          onClick={async () => {
            console.log(JSON.stringify(loginInfo));
            const response = await fetch(
              "http://localhost:8080/api/auth/login",
              {
                method: "POST",
                body: JSON.stringify(loginInfo),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const token_pack = await response.json();
            console.log(token_pack);

            localStorage.setItem("token", token_pack.token);

            setLoginInfo({
              email: "",
              password: "",
            });

            router.push("/");
          }}
        >
          Login
        </button>
        <p className="text-white text-xs">
          Click to here to{" "}
          <a
            className="text-blue-600 hover:text-blue-700 cursor-pointer"
            href="/signup"
          >
            sign up
          </a>
        </p>
      </div>
    </div>
  );
}
