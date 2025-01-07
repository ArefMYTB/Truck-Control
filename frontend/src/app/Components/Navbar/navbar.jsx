"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './navbar.scss';
import { images } from '../../Constants';

const Navbar = ({ isSidebarOpen, toggleSidebar }) => {
  const [dateTime, setDateTime] = useState({ time: '', date: '' });

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
          />
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
