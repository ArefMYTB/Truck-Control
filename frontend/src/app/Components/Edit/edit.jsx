import React, { useState, useEffect } from "react";
import IranLicensePlate from "../Plate/License_Plate/Iran/lp";
import ContainerPlate from "../Plate/Container_Plate/cp";

const Edit = ({ truck, onClose, onSave }) => {
  const [formData, setFormData] = useState(truck);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ top: 10, left: 500 });
  const [selectedLpCode, setSelectedLpCode] = useState(null);
  const [selectedContainerCode, setSelectedContainerCode] = useState(null);

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

  const handlePlateSelection = (type, plate) => {
    if (type === "lp") {
      setSelectedLpCode(plate);
    } else if (type === "container") {
      setSelectedContainerCode(plate);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if any plate is selected. If not, keep all plates unchanged.
    const updatedData = {
      ...formData,
      lp_codes: selectedLpCode ? [selectedLpCode] : formData.lp_codes,
      container_codes: selectedContainerCode
        ? [selectedContainerCode]
        : formData.container_codes,
    };
  
    onSave(updatedData);
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

  useEffect(() => {
    // Automatically select the first plate if only one exists
    if (formData.lp_codes?.length === 1) {
      setSelectedLpCode(formData.lp_codes[0]);
    }
    if (formData.container_codes?.length === 1) {
      setSelectedContainerCode(formData.container_codes[0]);
    }
  }, [formData.lp_codes, formData.container_codes]);

  return (
    <div className="fixed inset-0 overflow-auto flex items-center justify-center bg-gray-500 bg-opacity-50">
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
              <label className="block text-sm font-medium mb-2">عکس پلاک</label>
              {formData.lp_image ? (
                <img
                  src={`http://localhost:8000/media/${formData.lp_image}`}
                  alt="LP Image"
                  className="w-full h-40 object-contain border border-gray-300 rounded-lg mb-2"
                />
              ) : (
                <p className="text-gray-500">No image available</p>
              )}
              <input
                type="text"
                name="lp_image"
                value={formData.lp_image || ""}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">عکس کانتینر</label>
              {formData.container_image ? (
                <img
                  src={`http://localhost:8000/media/${formData.container_image}`}
                  alt="Container Image"
                  className="w-full h-40 object-contain border border-gray-300 rounded-lg mb-2"
                />
              ) : (
                <p className="text-gray-500">No image available</p>
              )}
              <input
                type="text"
                name="container_image"
                value={formData.container_image || ""}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">کد پلاک</label>
              {formData.lp_codes?.length > 1 ? (
                <div className="space-y-2">
                  {formData.lp_codes.map((lp) => (
                    <div
                      key={lp}
                      className={`cursor-pointer p-2 rounded-md border ${
                        lp === selectedLpCode ? "bg-blue-500 text-white" : "bg-gray-100"
                      }`}
                      onClick={() => handlePlateSelection("lp", lp)}
                    >
                      <IranLicensePlate
                        part1={lp.slice(0, 2)}
                        letter={lp.slice(7)}
                        part2={lp.slice(2, 5)}
                        code={lp.slice(5, 7)}
                        ws={200}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  name="lp_codes"
                  value={formData.lp_codes ? formData.lp_codes.join(", ") : ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              )}
            </div>

            {/* Container Plate Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">کد کانتینر</label>
              {formData.container_codes?.length > 1 ? (
                <div className="space-y-2">
                  {formData.container_codes.map((container) => (
                    <div
                      key={container}
                      className={`cursor-pointer p-2 rounded-md border ${
                        container === selectedContainerCode
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      }`}
                      onClick={() => handlePlateSelection("container", container)}
                    >
                      <ContainerPlate
                        part1={container.slice(0, 4)}
                        part2={container.slice(4, 10)}
                        part3={container.slice(10, 11)}
                        part4={container.slice(11, 15)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  name="container_codes"
                  value={formData.container_codes ? formData.container_codes.join(", ") : ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              )}
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
