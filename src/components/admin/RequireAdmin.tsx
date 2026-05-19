"use client";

import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useEffect } from "react";

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isReady } = useAdminAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (isReady && !isAuthenticated) {
  //     router.replace("/admin/login");
  //   }
  // }, [isReady, isAuthenticated, router]);

  // if (!isReady || !isAuthenticated) {
  //   return null;
  // }

  return <>{children}</>;
};

export default RequireAdmin;
