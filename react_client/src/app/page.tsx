"use client";
import { AuthContext } from "@/context/auth/AuthContext";

import { Button } from "antd";
import Link from "next/link";
import { useContext } from "react";

export default function Home() {
  const { user } = useContext(AuthContext) as IAuthContext;
  return (
    <main>
      {JSON.stringify(user)}
      <Link href="/sites">
        <Button type="primary">Go to sites</Button>
      </Link>
    </main>
  );
}
