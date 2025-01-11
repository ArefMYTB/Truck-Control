import React from "react";

const IranLicensePlate = ({ part1, letter, part2, code }) => {
  return (
    <div className="relative w-[150px] h-[35px] bg-yellow-400 border-2 border-black rounded-md flex">
      <div className="w-[50px] h-full bg-blue-500 flex flex-col justify-between items-center">
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

      <div className="flex-grow flex justify-between items-center space-x-1 px-4">
        <span className="text-l font-bold">{part1}</span>
        <span className="text-l font-bold">{letter}</span>
        <span className="text-l font-bold">{part2}</span>
      </div>

      <div className="w-[70px] h-full border-l-2 border-black flex items-center justify-center">
        <span className="text-l font-bold">{code}</span>
      </div>
    </div>
  );
};

export default IranLicensePlate;
