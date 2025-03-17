import React, { useState, useEffect } from "react";

const View = ({ truck, onClose }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ top: 30, left: 500 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.left,
      y: e.clientY - position.top,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        left: e.clientX - offset.x,
        top: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div
        className="bg-white p-6 rounded-lg w-2/3 max-w-4xl"
        style={{
          position: "absolute",
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        {/* Draggable Header */}
        <div
          className="cursor-move bg-gray-200 p-3 rounded-t-lg"
          onMouseDown={handleMouseDown}
        >
          <h2 className="text-2xl font-semibold text-center">مشاهده اطلاعات</h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* View-Only Fields */}
            <div>
              <label className="block text-sm font-medium mb-2">عکس پلاک</label>
              {truck.lp_image ? (
                <img
                  src={`http://46.148.36.110:226/api/media/${truck.lp_image}`}
                  alt="LP Image"
                  className="w-full h-40 object-contain border border-gray-300 rounded-lg mb-2"
                />
              ) : (
                <p className="text-gray-500">No image available</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">عکس کانتینر</label>
              {truck.container_image ? (
                <img
                  src={`http://46.148.36.110:226/api/media/${truck.container_image}`}
                  alt="Container Image"
                  className="w-full h-40 object-contain border border-gray-300 rounded-lg mb-2"
                />
              ) : (
                <p className="text-gray-500">No image available</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">پلاک</label>
              <input
                type="text"
                value={truck.lp_codes || ""}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">کد کانتینر</label>
              <input
                type="text"
                value={truck.container_codes || ""}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">نوع بار</label>
              <input
                type="text"
                value={truck.load_type || ""}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">سایز کانتینر</label>
              <input
                type="text"
                value={truck.Container_size || ""}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">آیدی راننده</label>
              <input
                type="text"
                value={truck.driver_id || ""}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">وزن</label>
              <input
                type="text"
                value={truck.weight || ""}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">پلمپ</label>
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-1">
                  <div
                    className={`w-4 h-4 rounded-full ${truck.seal ? "bg-green-500" : "bg-gray-300"} border`}
                  ></div>
                  <span>هست</span>
                </div>
                <div className="flex items-center gap-1">
                  <div
                    className={`w-4 h-4 rounded-full ${!truck.seal ? "bg-red-500" : "bg-gray-300"} border`}
                  ></div>
                  <span>نیست</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">خطرناک</label>
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-1">
                  <div
                    className={`w-4 h-4 rounded-full ${truck.imdg ? "bg-green-500" : "bg-gray-300"} border`}
                  ></div>
                  <span>هست</span>
                </div>
                <div className="flex items-center gap-1">
                  <div
                    className={`w-4 h-4 rounded-full ${!truck.imdg ? "bg-red-500" : "bg-gray-300"} border`}
                  ></div>
                  <span>نیست</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">وضعیت</label>
              <input
                type="text"
                value={truck.status || ""}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                readOnly
              />
            </div>

            {/* Non-editable Fields */}
            <div>
              <label className="block text-sm font-medium mb-2">تاریخ عبور</label>
              <input
                type="text"
                value={truck.log_time || ""}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                readOnly
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              بستن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
