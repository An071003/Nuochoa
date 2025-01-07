import React from "react";
import { useNavigate } from "react-router-dom";

export default function PurchaseSuccess() {
  const navigate = useNavigate();
  // Quay lại trang chủ
  const handleBackToHome = () => {
    navigate("/");
  };
  return (
    <div className="container mx-auto flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Cảm ơn bạn đã mua hàng!</h1>
        <p className="text-gray-700 mb-6">
          Đơn hàng của bạn đã được đặt thành công. Chúng tôi sẽ liên hệ với bạn để xác nhận đơn hàng sớm nhất có thể.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleBackToHome}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Quay lại Trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}
