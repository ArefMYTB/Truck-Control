"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Correct Next.js routing
import Navbar from "./Components/Navbar/navbar";
import Sidebar from "./Components/Slidebar/slidebar";
import Camera from "./Containers/Camera/camera";
import Records from "./Containers/Records/records";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
    if (!token) {
      router.push("/login"); // Use Next.js router instead of useNavigate
    }
  }, [router]);

  return isAuthenticated ? children : null;
};

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <ProtectedRoute>
      <>
        <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} />
        <Camera />
        <Records />
      </>
    </ProtectedRoute>
  );
}
