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

  const [showFilters, setShowFilters] = useState(false); // For showing/hiding filters
  const [filters, setFilters] = useState({
    lpCodeRange: "",
    loadType: "",
    containerSize: "",
  }); // Filters state
  const [filterApplied, setFilterApplied] = useState(false); // Track if filters are applied

  const fetchData = async (appliedFilters) => {
    setLoading(true);
    try {
      let url = "http://localhost:8000/api/trucklog/";
      const params = new URLSearchParams();

      // Add filters to the query string if they're set
      if (appliedFilters.lpCodeRange) {
        params.append("lp_code_range", appliedFilters.lpCodeRange);
      }
      if (appliedFilters.loadType) {
        params.append("load_type", appliedFilters.loadType);
      }
      if (appliedFilters.containerSize) {
        params.append("container_size", appliedFilters.containerSize);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result.reverse());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!filterApplied) {
      fetchData({});
    }
  }, [filterApplied]);

  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (error) {
    return <div>خطا در بارگذاری داده‌ها: {error}</div>;
  }

  // Separate the latest record and the rest of the data
  const latestRecord = data[0];
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
              <button
                className="bg-gray-300 text-gray-700 px-4 py-1 rounded-lg"
                onClick={() => setShowFilters(!showFilters)}
              >
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

          {/* Filter Section */}
          {showFilters && (
            <div className="filter-options my-4 p-4 bg-gray-100 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* LP Code Range */}
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    محدوده کد LP
                  </label>
                  <input
                    type="text"
                    value={filters.lpCodeRange}
                    onChange={(e) =>
                      setFilters({ ...filters, lpCodeRange: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="برای مثال 10"
                  />
                </div>

                {/* Load Type */}
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    نوع بار
                  </label>
                  <input
                    type="text"
                    value={filters.loadType}
                    onChange={(e) =>
                      setFilters({ ...filters, loadType: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="برای مثال غذا"
                  />
                </div>

                {/* Container Size */}
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    اندازه کانتینر
                  </label>
                  <select
                    value={filters.containerSize}
                    onChange={(e) =>
                      setFilters({ ...filters, containerSize: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="20 فوت">20 فوت</option>
                    <option value="40 فوت">40 فوت</option>
                  </select>
                </div>
              </div>

              {/* Show Results Button */}
              <div className="mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => {
                    setFilterApplied(true);
                    fetchData(filters);
                    setShowFilters(false);
                  }}
                >
                  نمایش نتایج
                </button>
              </div>
            </div>
          )}

          <Table data={remainingRecords} />
        </div>
      </div>
    </div>
  );
};

export default Records;
