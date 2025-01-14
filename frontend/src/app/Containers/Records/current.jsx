import React from "react";
import IranLicensePlate from "@/app/Components/Plate/License_Plate/Iran/lp";
import ContainerPlate from "@/app/Components/Plate/Container_Plate/cp";
import {images} from '../../Constants'
import Image from 'next/image';
import { FaEdit } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import { BsEyeFill } from 'react-icons/bs';

const Current = ({ data }) => {

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
                            part1={data.lp_codes[0].slice(0, 2)}
                            letter={data.lp_codes[0].slice(7)}
                            part2={data.lp_codes[0].slice(2, 5)}
                            code={data.lp_codes[0].slice(5, 7)}
                            ws="150"
                        />
                        <div className="flex-grow flex justify-between items-center text-[10px]">
                            <span>درصد تشخیص: <span className="text-green-500">{data.lp_acc}%</span></span>
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
                            part1={data.container_codes[0].slice(0, 4)}
                            part2={data.container_codes[0].slice(4, 10)}
                            part3={data.container_codes[0].slice(10, 11)}
                            part4={data.container_codes[0].slice(11, 15)}
                        />
                        <div className="flex-grow flex justify-between items-center text-[10px]">
                            <span>درصد تشخیص: <span className="text-green-500">{data.container_acc}%</span></span>
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
                                data.driver_confirmed ? 'bg-green-500' : 'bg-red-500'
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
                            <p className="text-sm text-gray-700 text-right w-full mr-4">{data.load_type}</p>
                        </div>
                        <span>آیدی رانندی</span>
                        <div className="mt-1 w-40 h-10 bg-gray-300 flex items-center justify-center rounded-md">
                            <p className="text-sm text-gray-700 text-right w-full mr-4">{data.driver_id}</p>
                        </div>
                    </div>

                    <div className="grid mr-4">
                        <span>پلمپ</span>
                        <div className="mt-1 w-40 h-10 bg-gray-300 flex items-center justify-center rounded-md gap-4">
                            <div className="flex items-center gap-1">
                                <div
                                className={`w-4 h-4 rounded-full ${
                                    data.seal ? 'bg-green-500' : 'bg-gray-300'
                                } border`}
                                ></div>
                                <span>دارد</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div
                                className={`w-4 h-4 rounded-full ${
                                    !data.seal ? 'bg-red-500' : 'bg-gray-300'
                                } border`}
                                ></div>
                                <span>ندارد</span>
                            </div>
                        </div>

                            <span>خطرناک</span>
                            <div className="mt-1 w-40 h-10 bg-gray-300 flex items-center justify-center rounded-md gap-4">
                            <div className="flex items-center gap-1">
                                <div
                                className={`w-4 h-4 rounded-full ${
                                    data.imdg ? 'bg-green-500' : 'bg-gray-300'
                                } border`}
                                ></div>
                                <span>هست</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div
                                className={`w-4 h-4 rounded-full ${
                                    !data.imdg ? 'bg-red-500' : 'bg-gray-300'
                                } border`}
                                ></div>
                                <span>نیست</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid mr-4">
                        <span>سایز کانتینر</span>
                        <div className="mt-1 w-40 h-10 bg-gray-300 flex items-center justify-center rounded-md">
                            <p className="text-sm text-gray-700 text-right w-full mr-4">{data.Container_size}</p>
                        </div>
                        <span>وزن</span>
                        <div className="mt-1 w-40 h-10 bg-gray-300 flex items-center justify-center rounded-md">
                            <p className="text-sm text-gray-700 text-right w-full mr-4">{data.weight}</p>
                        </div>
                    </div>

                    <div className="grid mr-4">
                        <span>تاریخ عبور</span>
                        <div className="mt-1 w-40 h-10 bg-gray-300 flex items-center justify-center rounded-md">
                            <p className="text-sm text-gray-700 text-right w-full mr-4" dir="ltr">{data.log_time}</p>
                        </div>
                        <span>وضعیت</span>
                        <div className="mt-1 w-40 h-10 bg-gray-300 flex items-center justify-center rounded-md">
                            <p className="text-sm text-gray-700 text-right w-full mr-4">{data.status}</p>
                        </div>
                    </div>

{/*                     <div className="grid mr-4"> */}
{/*                         <span>تاریخ فاکتور</span> */}
{/*                         <div className="mt-1 w-40 h-10 bg-gray-300 flex items-center justify-center rounded-md"> */}
{/*                             <p className="text-sm text-gray-700 text-right w-full mr-4">{data.invoice_date}</p> */}
{/*                         </div> */}
{/*                         <span>نوع کالا</span> */}
{/*                         <div className="mt-1 w-40 h-10 bg-gray-300 flex items-center justify-center rounded-md"> */}
{/*                             <p className="text-sm text-gray-700 text-right w-full mr-4">{data.goods_type}</p> */}
{/*                         </div> */}
{/*                     </div> */}

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