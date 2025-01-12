import React from "react";
import IranLicensePlate from "@/app/Components/Plate/Licence_Plate/Iran/lp";
import {images} from '../../Constants'
import Image from 'next/image';
import { FaEdit } from 'react-icons/fa';


const Current = () => {
    return (
        <div className="current-record">
            <div className="w-11/12 mx-auto mt-2 bg-white p-5 rounded-lg shadow-md">
                <div className="flex justify-end items-center">
                    <span className="mr-2">جاری</span>
                    <div className="w-2.5 h-2.5 bg-green-500"></div>
                </div>
                <div className="overflow-x-auto flex rounded-lg p-4" dir="rtl">
                    <div className="grid gap-4">
                        <span>پلاک</span>
                        <div className="flex justify-center">
                            <Image 
                                src={images.lp}
                                className="rounded-lg"
                                width={150}
                                height={100} // Adjusting height to maintain aspect ratio
                            />
                        </div>
                        <IranLicensePlate
                            part1="512"
                            letter="ج"
                            part2="15"
                            code="22"
                            ws="200"
                        />
                        <div className="flex-grow flex justify-between items-center text-xs">
                            <span>درصد تشخیص: <span className="text-green-500">85%</span></span> {/* Green number */}
                            <div className="flex items-center text-[#042973]">
                                <FaEdit className="ml-2" /> {/* React icon for editing */}
                                <span className="ml-1">ویرایش</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mr-10">
                        <span>Hi</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Current;