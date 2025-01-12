"use client";
import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import { BsEyeFill } from 'react-icons/bs';
import { BsInfoCircleFill } from 'react-icons/bs';
import IranLicensePlate from "@/app/Components/Plate/Licence_Plate/Iran/lp"
import ContainerPlate from "@/app/Components/Plate/Container_Plate/cp"

const Table = () => {
    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {

        const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/trucklog/');
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
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

    return (
        <div className="overflow-x-auto rounded-lg p-4" dir="rtl">
        <table className="min-w-full table-auto border border-gray-300">
            <thead>
            <tr className="bg-gray-300 text-center">
                <th className="px-4 py-2">ردیف</th>
                <th className="px-4 py-2">پلاک</th>
                <th className="px-4 py-2">کد کانتینر</th>
                <th className="px-4 py-2">نوع بار</th>
                <th className="px-4 py-2">سایز کانتینر</th>
                <th className="px-4 py-2">آیدی راننده</th>
                <th className="px-4 py-2">وزن</th>
                <th className="px-4 py-2">پلمپ</th>
                <th className="px-4 py-2">نوع کالا</th>
                <th className="px-4 py-2">نوع مسیر</th>
                <th className="px-4 py-2">وضعیت</th>
                <th className="px-4 py-2">تاریخ فاکتور</th>
                <th className="px-4 py-2">تاریخ عبور</th>
                <th className="px-4 py-2">عملیات</th>
            </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index} className={`text-center ${index % 2 === 0 ? '' : 'bg-gray-100'}`}>
                    <td className="px-4 py-2 align-middle">{index + 1}</td>
                    <td className="px-4 py-2 align-middle" dir="ltr">
                        <IranLicensePlate
                            part1={item.plate_part1}
                            letter={item.plate_letter}
                            part2={item.plate_part2}
                            code={item.plate_code}
                            ws="150"
                        />
                    </td>
                    <td className="px-4 py-2 align-middle">
                        <ContainerPlate
                            part1={item.container_part1}
                            part2={item.container_part2}
                            part3={item.container_part3}
                            part4={item.container_part4}
                        />
                    </td>
                    <td className="px-4 py-2 align-middle">{item.load_type}</td>
                    <td className="px-4 py-2 align-middle">{item.container_size}</td>
                    {/* Driver ID with confirmation icon */}
                    <td className="px-4 py-2 align-middle">
                        <div className="flex items-center justify-end gap-2">
                        <span>{item.driver_id}</span>
                        <BsInfoCircleFill
                            className={`${
                            item.driver_confirmed ? 'text-green-500' : 'text-red-500'
                            }`}
                            title={item.driver_confirmed ? 'تایید شده' : 'تایید نشده'}
                        />
                        </div>
                    </td>
                    <td className="px-4 py-2 align-middle">{item.weight}</td>
                    <td className="px-4 py-2 align-middle">
                        <div className="flex items-center justify-center gap-4">
                        <div className="flex items-center gap-1">
                            <div
                            className={`w-4 h-4 rounded-full ${
                                item.seal ? 'bg-green-500' : 'bg-gray-300'
                            } border`}
                            ></div>
                            <span>دارد</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div
                            className={`w-4 h-4 rounded-full ${
                                !item.seal ? 'bg-red-500' : 'bg-gray-300'
                            } border`}
                            ></div>
                            <span>ندارد</span>
                        </div>
                        </div>
                    </td>
                    <td className="px-4 py-2 align-middle">{item.goods_type}</td>
                    <td className="px-4 py-2 align-middle">{item.route_type}</td>
                    <td className="px-4 py-2 align-middle">{item.status}</td>
                    <td className="px-4 py-2 align-middle">{item.invoice_date}</td>
                    <td className="px-4 py-2 align-middle">{item.pass_date}</td>
                    <td className="px-4 py-2 align-middle">
                        <div className="flex justify-center items-center gap-2">
                        <BsEyeFill
                            className="text-green-500 cursor-pointer hover:scale-110 transition"
                            title="مشاهده"
                        />
                        <FaEdit
                            className="text-blue-500 cursor-pointer hover:scale-110 transition"
                            title="ویرایش"
                        />
                        <FaTrashCan
                            className="text-red-500 cursor-pointer hover:scale-110 transition"
                            title="حذف"
                        />
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>

        </table>
        </div>
    );
};

export default Table;