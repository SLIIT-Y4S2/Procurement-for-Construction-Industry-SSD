"use client";
import { AuthContext } from "@/Context/auth/AuthContext";
import { IAuthContext } from "@/types/auth.interface";
import { ReactNode, useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const AuthenticationWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { user, authenticated } = useContext(AuthContext) as IAuthContext;
  const pathname = usePathname();

  // useEffect(() => {
  //   if (!user) return;
  //   const { role } = user;
  //   if (pathname === "/login" && role === "procurementStaff") {
  //     router.push("/procurement-staff");
  //   }
  //   if (pathname === "/login" && role === "companyManager") {
  //     router.push("/company-manager");
  //   }
  // }, [router, pathname, user, authenticated]);

  // if (!user && !authenticated) {
  //   router.push("/login");
  // }

  if (pathname === "/login") {
    return <>{children}</>;
  }
  if (!user) {
    return <>loading..</>;
  }
  const { role } = user;

  const companyManagerOnly = ["/user-management", "/sites"];

  if (companyManagerOnly.includes(pathname) && role !== "companyManager") {
    return <AccessDenied />;
  }

  // if (pathname.startsWith("/user-management") && role !== "companyManager") {
  //   return <AccessDenied />;
  // }

  return <>{children}</>;
};

export default AuthenticationWrapper;

const AccessDenied = () => {
  return <div>Access Denied</div>;
};
