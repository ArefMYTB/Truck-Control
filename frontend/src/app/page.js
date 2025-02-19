"use client";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar/navbar";
import Sidebar from "./Components/Slidebar/slidebar";
import Camera from "./Containers/Camera/camera";
import Records from "./Containers/Records/records";
import Login from "./Containers/Login/login";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("authToken"); // Check token

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect if not logged in
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null; // Render children only if authenticated
};

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <Sidebar isOpen={isSidebarOpen} />
                <Camera />
                <Records />
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
