"use client";

import RequireAdmin from "@/components/admin/RequireAdmin";
import AdminLayout from "@/views/admin/AdminLayout";

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAdmin>
      <AdminLayout>{children}</AdminLayout>
    </RequireAdmin>
  );
}
