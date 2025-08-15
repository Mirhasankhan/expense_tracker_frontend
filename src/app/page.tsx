"use client";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  const { email } = useAppSelector(useCurrentUser);

  return (
    <div>
      {email ? (
        "jhee"
      ) : (
        <div className="flex items-center gap-8 justify-center">
          <Link href="/auth/login">           
            <button className="bg-primary text-white px-6 py-2 rounded-[8px] font-medium">Login</button>
          </Link>
          <Link href="/auth/register">           
            <button className="border border-primary rounded-[8px] text-primary bg-transparent px-6 py-2 font-medium">Sign Up</button>
          </Link>
         
        </div>
      )}
    </div>
  );
};

export default HomePage;
