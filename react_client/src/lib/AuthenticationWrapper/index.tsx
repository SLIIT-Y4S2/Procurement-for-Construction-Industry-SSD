"use client";
import { AuthContext } from "@/context/auth/AuthContext";

import { ReactNode, useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  COMPANY_MANAGER_ROUTES,
  PROCUREMENT_STAFF_ROUTES,
  SUPPLIER_ROUTES,
} from "@/utils/constants";

const AuthenticationWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { user, authenticated } = useContext(AuthContext) as IAuthContext;
  const pathname = usePathname();

  useEffect(() => {
    if (!user && !authenticated) {
      router.push("/login");
    }
  }, [user, authenticated, router]);

  if (pathname === "/login") {
    return <>{children}</>;
  }

  if (!user) {
    return <>loading..</>;
  }

  const { role } = user;

  if (role === "companyManager" && !COMPANY_MANAGER_ROUTES.includes(pathname)) {
    return <AccessDenied />;
  }

  if (
    role === "procurementStaff" &&
    !PROCUREMENT_STAFF_ROUTES.includes(pathname)
  ) {
    return <AccessDenied />;
  }

  if (role === "supplier" && !SUPPLIER_ROUTES.includes(pathname)) {
    return <AccessDenied />;
  }

  return <>{children}</>;
};

export default AuthenticationWrapper;

const AccessDenied = () => {
  return <div>Access Denied</div>;
};
