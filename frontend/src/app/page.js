"use client";
import React, { useEffect, useState } from 'react';
import Navbar from "./Components/Navbar/navbar";
import Sidebar from "./Components/Slidebar/slidebar";

export default function Home() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app">
      <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
    </div>
  );
}
