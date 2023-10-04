"use client";
import { useUser } from "@/lib/UserHook";
import React from "react";

const Sites = () => {
  const { user, authenticated } = useUser();

  return (
    <div>
      Sites
      {authenticated && <h1>Authenticated</h1>}
      {JSON.stringify(user)}
    </div>
  );
};

export default Sites;
