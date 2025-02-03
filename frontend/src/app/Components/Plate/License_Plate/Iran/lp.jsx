import React from "react";

const IranLicensePlate = ({ part1, letter, part2, code, ws }) => {
  return (
    <div className={`w-[${ws}px] h-[45px] bg-[#f6c60f] border-2 border-[#042973] rounded-md flex`} dir="ltr">
      <div className="w-[50px] h-full bg-[#042973] flex flex-col justify-between items-center">
        <div className="w-full h-[40%]">
          <div className="w-full h-1/3 bg-green-500"></div>
          <div className="w-full h-1/3 bg-white"></div>
          <div className="w-full h-1/3 bg-red-500"></div>
        </div>
        <div className="text-white text-center text-xxs leading-tight">
          <p>I.R</p>
          <p>IRAN</p>
        </div>
      </div>

      <div className="flex-grow flex justify-between items-center space-x-1 px-3">
        <span className="text-lg font-bold">{part1}</span>
        <span className="text-lg font-bold">{letter}</span>
        <span className="text-lg font-bold">{part2}</span>
      </div>

      <div className="w-[70px] h-full border-l-2 border-black flex items-center justify-center">
        <span className="text-lg font-bold">{code}</span>
      </div>
    </div>
  );
};

export default IranLicensePlate;