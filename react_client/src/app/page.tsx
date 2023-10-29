"use client";
import { AuthContext } from "@/context/auth/AuthContext";

import { Button } from "antd";
import Link from "next/link";
import { useContext } from "react";

export default function Home() {
  const { user } = useContext(AuthContext) as IAuthContext;
  return (
    <main>
      <h1 className="text-3xl font-semibold">Welcome {user?.name}</h1>
    </main>
  );
}
