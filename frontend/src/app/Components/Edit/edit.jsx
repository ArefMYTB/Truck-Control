import React, { useState, useEffect } from "react";

const Edit = ({ truck, onClose, onSave }) => {
  const [formData, setFormData] = useState(truck);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ top: 100, left: 500 });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "lp_codes" || name === "container_codes") {
      // Handle lp_codes and container_codes as arrays
      setFormData((prevData) => ({
        ...prevData,
        [name]: value ? value.split(",").map((item) => item.trim()) : [],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

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

  // Toggle the boolean value for seal and imdg
  const toggleBoolean = (field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: !prevData[field],
    }));
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
          <h2 className="text-2xl font-semibold text-center">ویرایش اطلاعات</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Editable Fields */}
            <div>
              <label className="block text-sm font-medium mb-2">کد پلاک</label>
              <input
                type="text"
                name="lp_codes"
                value={formData.lp_codes ? formData.lp_codes.join(", ") : ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">عکس پلاک</label>
              <input
                type="text"
                name="lp_image"
                value={formData.lp_image || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">کد کانتینر</label>
              <input
                type="text"
                name="container_codes"
                value={formData.container_codes ? formData.container_codes.join(", ") : ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">عکس کانتینر</label>
              <input
                type="text"
                name="container_image"
                value={formData.container_image || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">نوع بار</label>
              <input
                type="text"
                name="load_type"
                value={formData.load_type || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">سایز کانتینر</label>
              <input
                type="text"
                name="Container_size"
                value={formData.Container_size || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">آیدی راننده</label>
              <input
                type="text"
                name="driver_id"
                value={formData.driver_id || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">وزن</label>
              <input
                type="text"
                name="weight"
                value={formData.weight || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">پلمپ</label>
              <div className="flex items-center justify-center gap-4">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => toggleBoolean("seal")}
                >
                  <div
                    className={`w-4 h-4 rounded-full ${formData.seal ? "bg-green-500" : "bg-gray-300"} border`}
                  ></div>
                  <span>دارد</span>
                </div>
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => toggleBoolean("seal")}
                >
                  <div
                    className={`w-4 h-4 rounded-full ${!formData.seal ? "bg-red-500" : "bg-gray-300"} border`}
                  ></div>
                  <span>ندارد</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">خطرناک</label>
              <div className="flex items-center justify-center gap-4">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => toggleBoolean("imdg")}
                >
                  <div
                    className={`w-4 h-4 rounded-full ${formData.imdg ? "bg-green-500" : "bg-gray-300"} border`}
                  ></div>
                  <span>هست</span>
                </div>
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => toggleBoolean("imdg")}
                >
                  <div
                    className={`w-4 h-4 rounded-full ${!formData.imdg ? "bg-red-500" : "bg-gray-300"} border`}
                  ></div>
                  <span>نیست</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">وضعیت</label>
              <input
                type="text"
                name="status"
                value={formData.status || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Non-editable Fields */}
            <div>
              <label className="block text-sm font-medium mb-2">تاریخ عبور</label>
              <input
                type="text"
                value={formData.log_time || ""}
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
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              ذخیره تغییرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
