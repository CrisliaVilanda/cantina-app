"use client"

import { useState } from "react";
import Footer from "@/app/components/Footer";
import HeaderAdmin from "@/app/components/HeaaderAdmin";
import Sidebar from "@/app/components/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">


      <aside
        className={`transition-all duration-500 ${sidebarOpen ? "w-64" : "w-16"}`}>
        <Sidebar sidebarOpen={sidebarOpen} />
      </aside>

      <div className="flex flex-col flex-1">
        <HeaderAdmin toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-6">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}

