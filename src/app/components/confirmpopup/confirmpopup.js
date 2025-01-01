import React, { useState } from "react";

const ConfirmPopup = ({ title = "Bạn có chắc chắn muốn xóa?", onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
        <p className="text-lg font-semibold mb-4">{title}</p>
        <div className="mt-4 flex justify-center space-x-4">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
            onClick={() => onConfirm(true)}
          >
            Có
          </button>
          <button
            className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 transition duration-200"
            onClick={() => onConfirm(false)}
          >
            Không
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
