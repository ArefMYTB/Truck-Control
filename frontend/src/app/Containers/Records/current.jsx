import React from "react";

const Current = () => {
    return (
        <div className="current-record">
            <div className="w-11/12 mx-auto mt-2 bg-white p-5 rounded-lg shadow-md">
                <div className="flex justify-end items-center">
                    <span className="mr-2">جاری</span>
                    <div className="w-2.5 h-2.5 bg-green-500"></div>
                </div>
            </div>
        </div>
    );
};

export default Current;
