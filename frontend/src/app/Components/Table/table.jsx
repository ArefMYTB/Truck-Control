import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import { BsEyeFill } from 'react-icons/bs';
import { BsInfoCircleFill } from 'react-icons/bs'; // Information icon

const Table = () => {
  const data = [
    {
      row: 1,
      plate: 'پلاک ۱',
      containerCode: 'C001',
      loadType: 'نوع ۱',
      containerSize: '۲۰ فوت',
      driverID: '0123456789',
      driverConfirmed: true, // Boolean for confirmation
      weight: '2000kg',
      seal: true,
      goodsType: 'کالا ۱',
      routeType: 'مسیر ۱',
      status: 'وضعیت ۱',
      invoiceDate: '2025-01-01',
      passDate: '2025-01-02',
      actions: '',
    },
    {
      row: 2,
      plate: 'پلاک ۲',
      containerCode: 'C002',
      loadType: 'نوع ۲',
      containerSize: '۴۰ فوت',
      driverID: '0123456789',
      driverConfirmed: false, // Boolean for confirmation
      weight: '4000kg',
      seal: false,
      goodsType: 'کالا ۲',
      routeType: 'مسیر ۲',
      status: 'وضعیت ۲',
      invoiceDate: '2025-01-03',
      passDate: '2025-01-04',
      actions: '',
    },
    // Add more rows as needed...
  ];

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
            <tr key={item.row} className={`text-center ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
              <td className="px-4 py-2">{item.row}</td>
              <td className="px-4 py-2">{item.plate}</td>
              <td className="px-4 py-2">{item.containerCode}</td>
              <td className="px-4 py-2">{item.loadType}</td>
              <td className="px-4 py-2">{item.containerSize}</td>
              {/* Driver ID with confirmation icon */}
              <td className="px-4 py-2 flex items-center justify-end gap-2">
                <span>{item.driverID}</span>
                <BsInfoCircleFill
                  className={`${
                    item.driverConfirmed ? 'text-green-500' : 'text-red-500'
                  }`}
                  title={item.driverConfirmed ? 'تایید شده' : 'تایید نشده'}
                />
              </td>
              <td className="px-4 py-2">{item.weight}</td>
              <td className="px-4 py-2 flex items-center gap-4">
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
              </td>
              <td className="px-4 py-2">{item.goodsType}</td>
              <td className="px-4 py-2">{item.routeType}</td>
              <td className="px-4 py-2">{item.status}</td>
              <td className="px-4 py-2">{item.invoiceDate}</td>
              <td className="px-4 py-2">{item.passDate}</td>
              <td className="px-4 py-2 flex justify-center items-center gap-2">

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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
