"use client";
import { AuthContext } from "@/lib/auth/AuthContext";
import { IAuthContext } from "@/types/auth.interface";
import React, { useContext } from "react";

const Sites = () => {
  const { user, authenticated } = useContext(AuthContext) as IAuthContext;

  return (
    <div>
      Sites
      {authenticated && <h1>Authenticated</h1>}
      {JSON.stringify(user)}
    </div>
  );
};

export default Sites;
