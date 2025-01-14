"use client";
import React, { useEffect, useState } from "react";
import { FaSyncAlt, FaDownload } from "react-icons/fa";
import "./records.scss";
import Table from "@/app/Components/Table/table";
import Current from "@/app/Containers/Records/current";

const Records = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/trucklog/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result)
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    }, []);

    if (loading) {
    return <div>در حال بارگذاری...</div>;
    }

    if (error) {
    return <div>خطا در بارگذاری داده‌ها: {error}</div>;
    }

    // Separate the latest record and the rest of the data
    const latestRecord = data[-1];
    const remainingRecords = data.slice(1);

    return (
        <div className="records-section">
          {/* Pass the latest record to Current */}
          <Current data={latestRecord} />

          <div className="all-records">
            <div className="w-11/12 mx-auto mt-2 bg-white p-5 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <button className="bg-green-500 text-white px-4 py-1 rounded-lg">
                    افزودن دستی +
                  </button>
                  <button className="bg-gray-300 text-gray-700 px-4 py-1 rounded-lg">
                    فیلتر و جستجو
                  </button>

                  <div className="flex justify-center items-center w-8 h-8 bg-gray-300 rounded-md p-2">
                    <FaSyncAlt size={14} className="text-gray-700" />
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-gray-300 rounded-md p-2">
                    <FaDownload size={15} className="text-gray-700" />
                  </div>
                </div>

                <div className="flex justify-end items-center">
                  <span className="mr-2">رکورد ها</span>
                  <div className="w-2.5 h-2.5 bg-green-500"></div>
                </div>
              </div>

              <Table data={remainingRecords} />
            </div>
          </div>
        </div>
    );
};

export default Records;
