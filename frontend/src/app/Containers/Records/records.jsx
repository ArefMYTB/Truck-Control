"use client";
import React, { useEffect, useState } from 'react';
import { FaSyncAlt, FaDownload } from 'react-icons/fa';
import './records.scss';
import Table from '@/app/Components/Table/table'
import Current from '@/app/Containers/Records/current'

const Records = () => {

    return (
        <div className="records-section">

            <Current />


            <div className="all-records">

                <div className="w-11/12 mx-auto mt-2 bg-white p-5 rounded-lg shadow-md">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <button className="bg-green-500 text-white px-4 py-1 rounded-lg">افزودن دستی +</button>
                            <button className="bg-gray-300 text-gray-700 px-4 py-1 rounded-lg">فیلتر و جستجو</button>

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

                    <Table/>
                </div>

            </div>

        </div>
    );
};

export default Records;