import React from "react";

const ContainerPlate = ({ part1, part2, part3, part4 }) => {
  return (
    <div className="text-white text-xs w-[150px] h-[46px] bg-[#0997c7] rounded-md p-1" dir="ltr">
      <div className="flex items-center justify-between">
        <div>{part1}</div>
        <div className="flex flex-col items-center">
          <div>{part2}</div>
          <div className="mt-1">{part4}</div>
        </div>
        <div className="w-6 h-6 border border-white flex items-center justify-center">
          {part3}
        </div>
      </div>
    </div>
  );
};

export default ContainerPlate;
