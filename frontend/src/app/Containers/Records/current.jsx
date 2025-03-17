import React, { useState, useEffect } from "react";
import IranLicensePlate from "@/app/Components/Plate/License_Plate/Iran/lp";
import AfghanLicensePlate from "@/app/Components/Plate/License_Plate/Afghan/lp";
import ContainerPlate from "@/app/Components/Plate/Container_Plate/cp";
import { FaEdit } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import { BsEyeFill } from 'react-icons/bs';
import Edit from "@/app/Components/Edit/edit";
import View from "@/app/Components/View/view";

const Current = ({ data: initialData }) => {

    const [data, setData] = useState(initialData);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isViewModalOpen, setViewModalOpen] = useState(false);
    const [currentTruck, setCurrentTruck] = useState(null);

    const handleEdit = (truck) => {
        setCurrentTruck(truck); // Set the truck data for editing
        setEditModalOpen(true); // Open the modal
    };

    const handleUpdate = async (updatedTruck) => {
        try {
            const response = await fetch(
                `http://46.148.36.110:226/api/trucklog/update/${updatedTruck.id}/`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedTruck),
                }
            );

            if (response.ok) {
                const updatedData = await response.json();
                setData(updatedData); // Update the single truck data
                setEditModalOpen(false); // Close the modal
            } else {
                alert("Failed to update the truck.");
            }
        } catch (error) {
            console.error("Error updating truck:", error);
            alert("An error occurred while updating the truck.");
        }
    };

    const handleDelete = async (id) => {
        if (typeof window !== 'undefined') {
            if (!window.confirm("آیا از حذف این رکورد اطمینان دارید؟")) return;
        }

        const response = await fetch(
            `http://46.148.36.110:226/api/trucklog/delete/${id}/`,
            {
                method: "DELETE",
            }
        );

        if (response.ok) {
            setData(null); // Clear the data after deletion
        } else {
            alert("عملیات حذف رکورد ناموفق بود.");
        }
    };

    const handleView = (truck) => {
        setCurrentTruck(truck); // Set the truck data for viewing
        setViewModalOpen(true); // Open the view modal
    };

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
                        <img
                            src={`http://46.148.36.110:226/api/media/${data?.lp_image}`}
                            alt="License Plate"
                            className="w-[150px]"
                        />
                            {/* <Image
                                src={images.lp}
                                className="rounded-lg"
                                width={150}
                            /> */}
                        </div>
                        {
                            data?.lp_codes?.map((lpCode, index) => (
                                <div key={index}>
                                    {data.plate_type === "Iran" ? (
                                        <IranLicensePlate lpCode={lpCode} ws="150" />
                                    ) : data.plate_type === "Afghan" ? (
                                        <AfghanLicensePlate lpCode={lpCode} ws="150" />
                                    ) : null}
                                    {data?.lp_acc && data?.lp_acc[index] && (
                                        <div className="flex-grow flex justify-between items-center text-[10px] mt-2">
                                        <span>درصد تشخیص: <span className="text-green-500">{data?.lp_acc[index]}%</span></span>
                                        <div className="flex items-center text-[#042973]">
                                            <FaEdit className="ml-1" />
                                            <span>ویرایش</span>
                                        </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        }
                        
                    </div>

                    <div className="grid gap-3">
                        <span>کد کانتینر</span>
                        <div className="flex">
                            <img
                                src={`http://46.148.36.110:226/api/media/${data?.container_image}`}
                                alt="Container Code"
                                className="w-[150px]"
                            />
                            {/* <Image
                                src={images.cp}
                                className="rounded-lg"
                                width={150}
                            /> */}
                        </div>
                        {
                            data?.container_codes?.map((containerCode, index) => (
                                <div key={index}>
                                <ContainerPlate
                                    part1={containerCode.slice(0, 4)}
                                    part2={containerCode.slice(4, 10)}
                                    part3={containerCode.slice(10, 11)}
                                    part4={containerCode.slice(11, 15)}
                                />
                                {data?.container_acc && data?.container_acc[index] && (
                                    <div className="flex-grow flex justify-between items-center text-[10px] mt-2">
                                    <span>درصد تشخیص: <span className="text-green-500">{data?.container_acc[index]}%</span></span>
                                    <div className="flex items-center text-[#042973]">
                                        <FaEdit className="ml-1" />
                                        <span>ویرایش</span>
                                    </div>
                                    </div>
                                )}
                                </div>
                            ))
                        }
                    </div>

                    <div className="grid gap-3 mr-4">
                        <span>تصاویر دوربین</span>
                        <div className="flex justify-center gap-2">
                            <div className="flex flex-col items-center">
                                <img
                                    src={`http://46.148.36.110:226/api/media/${data?.vehicle_image_front}`}
                                    alt="Front Truck"
                                    className="w-[200px] h-[150] rounded-lg"
                                />
                                {/* <Image
                                    src={images.user}
                                    className="rounded-lg"
                                    width={100}
                                    height={100}
                                /> */}
                                <p className="mt-2 text-center text-sm">تصویر روبرو</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <img
                                    src={`http://46.148.36.110:226/api/media/${data?.vehicle_image_back}`}
                                    alt="Back Truck"
                                    className="w-[200px] h-[150] rounded-lg"
                                />
                                {/* <Image
                                    src={images.user}
                                    className="rounded-lg"
                                    width={100}
                                    height={100}
                                /> */}
                                <p className="mt-2 text-center text-sm">تصویر پشت</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-3 mr-4">
                        <span className="text-center"> احراز هویت</span>
                        <div className="flex flex-col items-center">
                            <img
                                src={`http://46.148.36.110:226/api/media/${data?.driver_face}`}
                                alt="Driver Image"
                                className="w-[100px] h-[100] rounded-lg"
                            />
                            {/* <Image
                                src={images.user} // Replace with the actual path or URL
                                className="rounded-lg"
                                width={100}
                                height={100}
                                alt="Centered Image"
                            /> */}

                            {/* Confirmation Rectangle */}
                            <div
                                className={`mt-2 h-8 flex items-center justify-center text-white font-semibold rounded-md ${
                                data?.driver_confirmed === true ? 'bg-green-500' : data?.driver_confirmed === false ? 'bg-red-500' : ''
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
                            <p className="text-sm text-gray-700 text-right w-full mr-4">{data?.load_type}</p>
                        </div>
                        <span>آیدی رانندی</span>
                        <div className="mt-1 w-40 h-10 bg-gray-300 flex items-center justify-center rounded-md">
                            <p className="text-sm text-gray-700 text-right w-full mr-4">{data?.driver_id}</p>
                        </div>
                    </div>

                    <div className="grid mr-4">
                        <span>پلمپ</span>
                        <div className="mt-1 w-40 h-10 bg-gray-300 flex items-center justify-center rounded-md gap-4">
                            <div className="flex items-center gap-1">
                                <div
                                    className={`w-4 h-4 rounded-full ${
                                        data?.seal === true ? 'bg-green-500' : data?.seal === false ? 'bg-gray-100' : ''
                                    } border`}
                                ></div>
                                <span>دارد</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div
                                    className={`w-4 h-4 rounded-full ${
                                        data?.seal === false ? 'bg-red-500' : data?.seal === true ? 'bg-gray-100' : ''
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
                                    data?.imdg === true ? 'bg-green-500' : data?.imdg === false ? 'bg-gray-100' : ''
                                } border`}
                                ></div>
                                <span>هست</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div
                                className={`w-4 h-4 rounded-full ${
                                    data?.imdg === false ? 'bg-red-500' : data?.imdg === true ? 'bg-gray-100' : ''
                                } border`}
                                ></div>
                                <span>نیست</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid mr-4">
                        <span>سایز کانتینر</span>
                        <div className="mt-1 w-40 h-10 bg-gray-300 flex items-center justify-center rounded-md">
                            <p className="text-sm text-gray-700 text-right w-full mr-4">{data?.Container_size}</p>
                        </div>
                        <span>وزن</span>
                        <div className="mt-1 w-40 h-10 bg-gray-300 flex items-center justify-center rounded-md">
                            <p className="text-sm text-gray-700 text-right w-full mr-4">{data?.weight}</p>
                        </div>
                    </div>

                    <div className="grid mr-4">
                        <span>تاریخ عبور</span>
                        <div className="mt-1 w-40 h-10 bg-gray-300 flex items-center justify-center rounded-md">
                            <p className="text-sm text-gray-700 text-right w-full mr-4" dir="ltr">{data?.log_time}</p>
                        </div>
                        <span>وضعیت</span>
                        <div className="mt-1 w-40 h-10 bg-gray-300 flex items-center justify-center rounded-md">
                            <p className="text-sm text-gray-700 text-right w-full mr-4">{data?.status}</p>
                        </div>
                    </div>

{/*                     <div className="grid mr-4"> */}
{/*                         <span>تاریخ فاکتور</span> */}
{/*                         <div className="mt-1 w-40 h-10 bg-gray-300 flex items-center justify-center rounded-md"> */}
{/*                             <p className="text-sm text-gray-700 text-right w-full mr-4">{data?.invoice_date}</p> */}
{/*                         </div> */}
{/*                         <span>نوع کالا</span> */}
{/*                         <div className="mt-1 w-40 h-10 bg-gray-300 flex items-center justify-center rounded-md"> */}
{/*                             <p className="text-sm text-gray-700 text-right w-full mr-4">{data?.goods_type}</p> */}
{/*                         </div> */}
{/*                     </div> */}

                    <div className="grid">
                        <span className="text-center">عملیات</span>
                        <div className="mb-2 flex flex-col items-center justify-center gap-y-4 bg-gray-200 p-2 rounded">
                            <BsEyeFill
                                className="text-green-500 text-2xl cursor-pointer hover:scale-110 transition"
                                title="مشاهده"
                                onClick={() => handleView(data)}
                            />
                            <FaEdit
                                className="ml-1 text-blue-500 text-2xl cursor-pointer hover:scale-110 transition"
                                title="ویرایش"
                                onClick={() => handleEdit(data)}
                            />
                            <FaTrashCan
                                className="text-red-500 text-2xl cursor-pointer hover:scale-110 transition"
                                title="حذف"
                                onClick={() => handleDelete(data?.id)}
                            />
                        </div>
                    </div>
                    {/* Edit */}
                    {isEditModalOpen && currentTruck && (
                        <Edit
                        truck={currentTruck}
                        onClose={() => setEditModalOpen(false)}
                        onSave={handleUpdate}
                        />
                    )}

                    {/* View */}
                    {isViewModalOpen && currentTruck && (
                        <View
                        truck={currentTruck}
                        onClose={() => setViewModalOpen(false)} // Close the view modal
                        />
                    )}            
                </div>
            </div>
        </div>
    );
};

export default Current;