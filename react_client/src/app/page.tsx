"use client";
import Header from "@/components/Header";
import { useUser } from "@/lib/UserHook";
import { Button } from "antd";
import Link from "next/link";

export default function Home() {
  const { user, authenticated } = useUser();
  if (!user || !authenticated) {
    return (
      <div>
        <h1> Loading... </h1>
      </div>
    );
  }
  return (
    <main>
      <Header />
      {JSON.stringify(user)}
      <Link href="/sites">
        <Button type="primary">Go to sites</Button>
      </Link>
    </main>
  );
}
