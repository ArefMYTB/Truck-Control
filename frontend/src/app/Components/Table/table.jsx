"use client";
import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import { BsEyeFill } from 'react-icons/bs';
import { BsInfoCircleFill } from 'react-icons/bs';
import IranLicensePlate from "@/app/Components/Plate/License_Plate/Iran/lp"
import ContainerPlate from "@/app/Components/Plate/Container_Plate/cp"
import Edit from '../Edit/edit';
import View from '../View/view';

const Table = ({ data: initialData }) => {

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
            `http://localhost:8000/api/trucklog/update/${updatedTruck.id}/`,
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
            setData((prevData) =>
            prevData.map((truck) =>
                truck.id === updatedTruck.id ? updatedData : truck
            )
            );
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
      if (!window.confirm("آیا از حذف این رکورد اطمینان دارید؟")) return;
  
      const response = await fetch(
        `http://localhost:8000/api/trucklog/delete/${id}/`,
        {
          method: "DELETE",
        }
      );
  
      if (response.ok) {
        setData((prevData) => prevData.filter((item) => item.id !== id)); 
      } else {
        alert("عملیات حذف رکورد ناموفق بود.");
      }
    };

    const handleView = (truck) => {
        setCurrentTruck(truck); // Set the truck data for viewing
        setViewModalOpen(true); // Open the view modal
    };


    const [visibleColumns, setVisibleColumns] = useState({
        row: true,
        plate: true,
        containerCode: true,
        loadType: true,
        containerSize: true,
        driverId: true,
        weight: true,
        seal: true,
        imdg: true,
        status: true,
        logTime: true,
        actions: true
    });

    const toggleColumnVisibility = (column) => {
        setVisibleColumns((prevState) => ({
        ...prevState,
        [column]: !prevState[column]
        }));
    };

  return (
    <div className="overflow-x-auto rounded-lg p-4" dir="rtl">
      <div className="mb-4">
        <select
          onChange={(e) => toggleColumnVisibility(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value="" disabled selected>انتخاب ستون</option>
          {Object.keys(visibleColumns).map((column) => (
            <option key={column} value={column}>
              {column === 'row' && 'ردیف'}
              {column === 'plate' && 'پلاک'}
              {column === 'containerCode' && 'کد کانتینر'}
              {column === 'loadType' && 'نوع بار'}
              {column === 'containerSize' && 'سایز کانتینر'}
              {column === 'driverId' && 'آیدی راننده'}
              {column === 'weight' && 'وزن'}
              {column === 'seal' && 'پلمپ'}
              {column === 'imdg' && 'خطرناک'}
              {column === 'status' && 'وضعیت'}
              {column === 'logTime' && 'تاریخ عبور'}
              {column === 'actions' && 'عملیات'}
            </option>
          ))}
        </select>
      </div>

      <table className="min-w-full table-auto border border-gray-300 justify-center align-middle items-center">
        <thead>
          <tr className="bg-gray-300 text-center">
            {visibleColumns.row && <th className="px-4 py-2">ردیف</th>}
            {visibleColumns.plate && <th className="px-4 py-2">پلاک</th>}
            {visibleColumns.containerCode && <th className="px-4 py-2">کد کانتینر</th>}
            {visibleColumns.loadType && <th className="px-4 py-2">نوع بار</th>}
            {visibleColumns.containerSize && <th className="px-4 py-2">سایز کانتینر</th>}
            {visibleColumns.driverId && <th className="px-4 py-2">آیدی راننده</th>}
            {visibleColumns.weight && <th className="px-4 py-2">وزن</th>}
            {visibleColumns.seal && <th className="px-4 py-2">پلمپ</th>}
            {visibleColumns.imdg && <th className="px-4 py-2">خطرناک</th>}
            {visibleColumns.status && <th className="px-4 py-2">وضعیت</th>}
            {visibleColumns.logTime && <th className="px-4 py-2">تاریخ عبور</th>}
            {visibleColumns.actions && <th className="px-4 py-2">عملیات</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={`text-center ${index % 2 === 0 ? '' : 'bg-gray-100'}`}>
              {visibleColumns.row && <td className="px-4 py-2 align-middle">{index + 1}</td>}
              {visibleColumns.plate && (
                <td className="px-4 py-2 align-middle space-y-2">
                    {
                        item.lp_codes.map((lpCode, index) => (
                            <IranLicensePlate
                            key={index}
                            part1={lpCode.slice(0, 2)}
                            letter={lpCode.slice(7)}
                            part2={lpCode.slice(2, 5)}
                            code={lpCode.slice(5, 7)}
                            ws="150"
                            />
                        ))
                    }
                </td>
              )}
              {visibleColumns.containerCode && (
                <td className="px-4 py-2 align-middle space-y-2">

                    {
                        item.container_codes.map((containerCode, index) => (
                            <ContainerPlate
                            key={index}
                            part1={containerCode.slice(0, 4)}
                            part2={containerCode.slice(4, 10)}
                            part3={containerCode.slice(10, 11)}
                            part4={containerCode.slice(11, 15)}
                            />
                        ))
                    }

                  
                </td>
              )}
              {visibleColumns.loadType && <td className="px-4 py-2 align-middle">{item.load_type}</td>}
              {visibleColumns.containerSize && <td className="px-4 py-2 align-middle">{item.Container_size}</td>}
              {visibleColumns.driverId && (
                <td className="px-4 py-2 align-middle">
                  <div className="flex items-center justify-center gap-2">
                    <span>{item.driver_id}</span>
                    <BsInfoCircleFill
                      className={`${
                        item.driver_confirmed ? 'text-green-500' : 'text-red-500'
                      }`}
                      title={item.driver_confirmed ? 'تایید شده' : 'تایید نشده'}
                    />
                  </div>
                </td>
              )}
              {visibleColumns.weight && <td className="px-4 py-2 align-middle">{item.weight}</td>}
              {visibleColumns.seal && (
                <td className="px-4 py-2 align-middle">
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex items-center gap-1">
                      <div
                        className={`w-4 h-4 rounded-full ${item.seal ? 'bg-green-500' : 'bg-gray-300'} border`}
                      ></div>
                      <span>دارد</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div
                        className={`w-4 h-4 rounded-full ${!item.seal ? 'bg-red-500' : 'bg-gray-300'} border`}
                      ></div>
                      <span>ندارد</span>
                    </div>
                  </div>
                </td>
              )}
              {visibleColumns.imdg && (
                <td className="px-4 py-2 align-middle">
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex items-center gap-1">
                      <div
                        className={`w-4 h-4 rounded-full ${item.imdg ? 'bg-green-500' : 'bg-gray-300'} border`}
                      ></div>
                      <span>هست</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div
                        className={`w-4 h-4 rounded-full ${!item.imdg ? 'bg-red-500' : 'bg-gray-300'} border`}
                      ></div>
                      <span>نیست</span>
                    </div>
                  </div>
                </td>
              )}
              {visibleColumns.status && <td className="px-4 py-2 align-middle">{item.status}</td>}
              {visibleColumns.logTime && <td className="px-4 py-2 align-middle" dir='ltr'>{item.log_time}</td>}
              {visibleColumns.actions && (
                <td className="px-4 py-2 align-middle">
                  <div className="flex justify-center items-center gap-2">
                    <BsEyeFill
                      className="text-green-500 cursor-pointer hover:scale-110 transition"
                      title="مشاهده"
                      onClick={() => handleView(item)}
                    />
                    <FaEdit
                      className="text-blue-500 cursor-pointer hover:scale-110 transition"
                      title="ویرایش"
                      onClick={() => handleEdit(item)}
                    />
                    <FaTrashCan
                      className="text-red-500 cursor-pointer hover:scale-110 transition"
                      title="حذف"
                      onClick={() => handleDelete(item.id)}
                    />
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
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
  );
};

export default Table;