"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './navbar.scss';
import { images } from '../../Constants';

const Navbar = ({ isSidebarOpen, toggleSidebar }) => {
  const [dateTime, setDateTime] = useState({ time: '', date: '' });
  const [showLogout, setShowLogout] = useState(false);
  
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const date = now.toISOString().split('T')[0].replace(/-/g, '/');
      setDateTime({ time, date });
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    if (typeof window !== 'undefined') {
      window.location.href = "/"; // Only access window on the client
    }
  };  

  return (
    <div className="navbar">
      <div className="navbar-left-section">
        <div className="logo-container">
          <Image 
            src={images.user}
            alt="User Logo"
            className="logo"
            width={40}
            height={40}
            onClick={() => setShowLogout(!showLogout)}
          />
          {showLogout && (
            <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-3 animate-fadeIn">
              <button 
                className="w-full text-white bg-red-500 hover:bg-red-600 py-2 rounded-lg transition duration-300"
                onClick={handleLogout}
              >
                خروج
              </button>
            </div>
          )}
        </div>
        <div className="date-time">
          {dateTime.time} | {dateTime.date}
        </div>
      </div>
      <div className="navbar-right-section">
        <div className="toggle-button" onClick={toggleSidebar}>
          {isSidebarOpen ? <FaChevronRight /> : <FaChevronLeft />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
