"use client";
import React, { useEffect, useState } from 'react';
import './navbar.scss';
import { images } from '@/app/Constants';

const Navbar = () => {
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
      <div className="left-section">
        <img 
          src={images.user}
          alt="Logo" 
          className="logo" 
        />
        <div className="date-time">
          {dateTime.time} | {dateTime.date}
        </div>
      </div>
      <div className="right-section">
        <div className="hamburger">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
