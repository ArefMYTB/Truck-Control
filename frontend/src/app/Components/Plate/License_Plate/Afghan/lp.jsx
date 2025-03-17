import React from "react";

const parseAfghanPlate = (lpCode) => {
  // Match pattern: letters at start, numbers in the middle, letter at the end
  const match = lpCode.match(/^([A-Za-z]+)(\d+)([A-Za-z])$/);
  if (match) {
    const [, letterPrefix, numberPart, letterSuffix] = match;
    return { letterPrefix, numberPart, letterSuffix };
  }
  return { letterPrefix: "", numberPart: "", letterSuffix: "" };
};

const AfghanLicensePlate = ({ lpCode, ws }) => {
  const { letterPrefix, numberPart, letterSuffix } = parseAfghanPlate(lpCode);

  return (
    <div
      className={`w-[${ws}px] h-[45px] bg-white border-2 border-black rounded-sm flex`}
      dir="ltr"
    >
      {/* Content */}
      <div className="flex w-full h-full text-black font-bold text-lg">
        {/* Left section */}
        <div className="flex items-center justify-center w-1/3">
          <span>{letterPrefix}</span>
        </div>

        {/* Center section */}
        <div className="flex items-center justify-center w-1/3">
          <span>{numberPart}</span>
        </div>

        {/* Right section */}
        <div className="flex items-center justify-center w-1/3">
          <span>{letterSuffix}</span>
        </div>
      </div>
    </div>
  );
};

export default AfghanLicensePlate;
