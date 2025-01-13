import React from "react";
import IranLicensePlate from "@/app/Components/Plate/Licence_Plate/Iran/lp";
import ContainerPlate from "@/app/Components/Plate/Container_Plate/cp";
import {images} from '../../Constants'
import Image from 'next/image';
import { FaEdit } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import { BsEyeFill } from 'react-icons/bs';

const Current = () => {

    status = true

    return (
        <div className="current-record">
            <div className="w-11/12 mx-auto mt-2 bg-white p-5 rounded-lg shadow-md">
                <div className="flex justify-end items-center">
                    <span className="mr-2">جاری</span>
                    <div className="w-2.5 h-2.5 bg-green-500"></div>
                </div>
                <div className="overflow-x-auto flex rounded-lg p-4 gap-4" dir="rtl">
                    <div className="grid gap-3">
                        <span>پلاک</span>
                        <div className="flex">
                            <Image 
                                src={images.lp}
                                className="rounded-lg"
                                width={150}
                            />
                        </div>
                        <IranLicensePlate
                            part1="512"
                            letter="ج"
                            part2="15"
                            code="22"
                            ws="150"
                        />
                        <div className="flex-grow flex justify-between items-center text-[10px]">
                            <span>درصد تشخیص: <span className="text-green-500">85%</span></span> 
                            <div className="flex items-center text-[#042973]">
                                <FaEdit className="ml-1" /> 
                                <span>ویرایش</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid gap-3">
                        <span>کد کانتینر</span>
                        <div className="flex">
                            <Image 
                                src={images.cp}
                                className="rounded-lg"
                                width={150}
                            />
                        </div>
                        <ContainerPlate
                            part1="MIOU"
                            part2="486429"
                            part3="4"
                            part4="45G1"
                        />
                        <div className="flex-grow flex justify-between items-center text-[10px]">
                            <span>درصد تشخیص: <span className="text-green-500">85%</span></span> 
                            <div className="flex items-center text-[#042973]">
                                <FaEdit className="ml-1" /> 
                                <span>ویرایش</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-3 mr-4">
                        <span>تصاویر دوربین</span>
                        <div className="flex justify-center gap-2">
                            <div className="flex flex-col items-center">
                                <Image
                                    src={images.user} 
                                    className="rounded-lg"
                                    width={100}
                                    height={100}
                                />
                                <p className="mt-2 text-center text-sm">تصویر روبرو</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <Image
                                    src={images.user} 
                                    className="rounded-lg"
                                    width={100}
                                    height={100}
                                />
                                <p className="mt-2 text-center text-sm">تصویر پشت</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-3 mr-4">
                        <span className="text-center"> احراز هویت</span>
                        <div className="flex flex-col items-center">
                            {/* Image */}
                            <Image
                                src={images.user} // Replace with the actual path or URL
                                className="rounded-lg"
                                width={100}
                                height={100}
                                alt="Centered Image"
                            />

                            {/* Confirmation Rectangle */}
                            <div
                                className={`mt-2 h-8 flex items-center justify-center text-white font-semibold rounded-md ${
                                status ? 'bg-green-500' : 'bg-red-500'
                                }`}
                                style={{ width: 100 }} // Dynamically set the width of the rectangle
                            >
                                احراز هویت
                            </div>
                        </div>
                    </div>

                    <div className="grid mr-4">
                        <span>نوع بار</span>
                        <div className="mt-1 w-40 h-10 bg-gray-300 flex items-center justify-center rounded-md">
                            <p className="text-sm text-gray-700 text-right w-full mr-4">فله</p>
                        </div>
                        <span>آیدی رانندی</span>
                        <div className="mt-1 w-40 h-10 bg-gray-300 flex items-center justify-center rounded-md">
                            <p className="text-sm text-gray-700 text-right w-full mr-4">123456789</p>
                        </div>
                    </div>

                    <div className="grid mr-4">
                        <span>پلمپ</span>
                        <div className="mt-1 w-40 h-10 bg-gray-300 flex items-center justify-center rounded-md">
                            <p className="text-sm text-gray-700 text-right w-full mr-4">دارد</p>
                        </div>
                        <span>نوع مسیر</span>
                        <div className="mt-1 w-40 h-10 bg-gray-300 flex items-center justify-center rounded-md">
                            <p className="text-sm text-gray-700 text-right w-full mr-4">تست</p>
                        </div>
                    </div>

                    <div className="grid mr-4">
                        <span>سایز کانتینر</span>
                        <div className="mt-1 w-40 h-10 bg-gray-300 flex items-center justify-center rounded-md">
                            <p className="text-sm text-gray-700 text-right w-full mr-4">40 فوت</p>
                        </div>
                        <span>وزن</span>
                        <div className="mt-1 w-40 h-10 bg-gray-300 flex items-center justify-center rounded-md">
                            <p className="text-sm text-gray-700 text-right w-full mr-4">20 تن</p>
                        </div>
                    </div>

                    <div className="grid mr-4">
                        <span>نوع کالا</span>
                        <div className="mt-1 w-40 h-10 bg-gray-300 flex items-center justify-center rounded-md">
                            <p className="text-sm text-gray-700 text-right w-full mr-4">تست</p>
                        </div>
                        <span>وضعیت</span>
                        <div className="mt-1 w-40 h-10 bg-gray-300 flex items-center justify-center rounded-md">
                            <p className="text-sm text-gray-700 text-right w-full mr-4">تست</p>
                        </div>
                    </div>

                    <div className="grid mr-4">
                        <span>تاریخ فاکتور</span>
                        <div className="mt-1 w-40 h-10 bg-gray-300 flex items-center justify-center rounded-md">
                            <p className="text-sm text-gray-700 text-right w-full mr-4">2025-01-01</p>
                        </div>
                        <span>تاریخ عبور</span>
                        <div className="mt-1 w-40 h-10 bg-gray-300 flex items-center justify-center rounded-md">
                            <p className="text-sm text-gray-700 text-right w-full mr-4">2025-01-01</p>
                        </div>
                    </div>

                    <div className="grid">
                        <span className="text-center">عملیات</span>
                        <div className="mb-4 flex flex-col items-center justify-center gap-y-3 bg-gray-100 p-2 rounded">
                            <BsEyeFill
                                className="text-green-500 text-2xl cursor-pointer hover:scale-110 transition"
                                title="مشاهده"
                            />
                            <FaEdit
                                className="ml-1 text-blue-500 text-2xl cursor-pointer hover:scale-110 transition"
                                title="ویرایش"
                            />
                            <FaTrashCan
                                className="text-red-500 text-2xl cursor-pointer hover:scale-110 transition"
                                title="حذف"
                            />
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Current;