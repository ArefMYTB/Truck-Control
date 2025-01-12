import React from "react";

const ContainerPlate = ({ part1, part2, part3, part4 }) => {
    return (
      <div className="text-white text-xs relative w-[150px] h-[46px] bg-[#0997c7] rounded-md p-1" dir="ltr">
        <div className="flex items-center justify-between">
          <div>{part1}</div>
          <div className="relative">
            {part2}
            <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2">
              {part4}
            </div>
          </div>
          <div className="w-6 h-6 border border-white flex items-center justify-center">
            {part3}
          </div>
        </div>
      </div>
    );
};
  
  

export default ContainerPlate;
