"use client";
import React, { useState, useEffect } from 'react';
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import './slidebar.scss';
import { PiSecurityCameraFill } from "react-icons/pi";
import { TbDeviceCameraPhone } from "react-icons/tb";
import { FaChevronUp, FaChevronDown, FaCamera } from 'react-icons/fa';
import Image from 'next/image';
import { images } from '../../Constants';
Chart.register(ArcElement);

const Section = ({ title, items, icon }) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    const handleToggle = () => {
      setIsExpanded(!isExpanded);
    };
  
    return (
      <div className="section">
        <div className="title-section">
            <div className='title-icon'>
                {icon}
                <h3>{title}</h3>
            </div>
            <div className="arrow-icon" onClick={handleToggle}>
                {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </div>
        </div>
  
        {isExpanded && (
          <div className="item-list">
            {items.map((item, index) => (
              <div className="item" key={index}>
                {item.icon}
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
};


const Sidebar = ({ isOpen }) => {

    const monitoringItems = [
        { title: 'دوربین 1', icon: <FaCamera className="sec-item-icon" /> },
        { title: 'دوربین 2', icon: <FaCamera className="sec-item-icon" /> },
        { title: 'دوربین 3', icon: <FaCamera className="sec-item-icon" /> },
    ];

    // Get Dashboard Data
    const [dashboardData, setDashboardData] = useState(null);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Here")
                const response = await fetch('http://127.0.0.1:8000/api/dashboard/');
                const data = await response.json();
                setDashboardData(data);

            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchData();
    }, []);

    if (!dashboardData) {
        return <p>Loading...</p>;
    }

    return (

        <div className={`sidebar ${isOpen ? 'open' : ''}`}>

            <div className="logo">
                <div className='logo-img'>
                    <Image 
                        src={images.logo}
                        alt="User Logo"
                        className="logo"
                        width={40}
                        height={40}
                    />
                </div>
                <div className='logo-txt'>
                    <h3>
                        <span style={{ color: '#6458eb', marginRight: '8px'  }}>H</span>
                        <span style={{ color: '#35d2f9', marginRight: '8px' }}>S</span>
                        <span style={{ color: '#f39532'}}>S</span>
                    </h3>
                    <p>سامانه هوشمند هگزان</p>
                </div>
            </div>


            <Section
                title="مانیتورینگ"
                items={monitoringItems}
                icon={<PiSecurityCameraFill className="sec-icon" />}
            />
            
            <Section
                title="مچینگ"
                items={monitoringItems}
                icon={<TbDeviceCameraPhone className="sec-icon" />}
            />

            <div className="dashboard">
            <div className="chart">
                <div className="chart-container">
                <Doughnut
                    data={{
                        datasets: [
                            {
                            data: [dashboardData.percentages.total_20foot_entries, dashboardData.percentages.total_fele_entries, dashboardData.percentages.total_40foot_entries],
                            backgroundColor: [
                                "#6458eb",
                                "#35d2f9",
                                "#f39532",
                            ],
                            display: true,
                            borderColor: "#D1D6DC"
                            }
                        ]
                    }}
                    options={{
                    rotation: -90,
                    circumference: 180,
                    cutout: "60%",
                    maintainAspectRatio: true,
                    responsive: true
                    }}
                />
                </div>
            </div>
            <div className="stats">
                <div className="stat-item">
                <span>تعداد تردد گیت</span>
                <p>{dashboardData.getTotal}</p>
                </div>
                <div className="stat-item">
                <span>تعداد تردد 20 فوت</span>
                <p>{dashboardData.entries.total_20foot_entries}</p>
                </div>
                <div className="stat-item">
                <span>تعداد تردد فله</span>
                <p>{dashboardData.entries.total_fele_entries}</p>
                </div>
                <div className="stat-item">
                <span>تعداد تردد 40 فوت</span>
                <p>{dashboardData.entries.total_40foot_entries}</p>
                </div>
            </div>
            </div>
        </div>        
    
    );
};

export default Sidebar;
