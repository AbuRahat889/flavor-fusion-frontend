"use client";

import AdminLayout from "@/views/admin/AdminLayout";

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminLayout>{children}</AdminLayout>
    </>
  );
}
