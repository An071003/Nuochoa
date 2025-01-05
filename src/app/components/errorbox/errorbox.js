import React from "react";

const ErrorModal = ({ error, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-auto">
        <p className="text-lg font-semibold mb-4 text-red-500 ">{error}</p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
