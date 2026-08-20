"use client"

import { useState } from "react";
import Footer from "@/app/components/Footer";
import HeaderAdmin from "@/app/components/admin/HeaaderAdmin";
import Sidebar from "@/app/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">

      <Sidebar sidebarOpen={sidebarOpen} />

      <div className="flex min-w-0 flex-1 flex-col">
        <HeaderAdmin toggleSidebar={() => setSidebarOpen((current) => !current)} />
        <main className="flex-1 p-6">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}

