import React from 'react';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const PasswordChangeSuccess = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center space-y-4">
        <FaRegCircleCheck className="h-16 w-16 text-green-500 mx-auto"/>
        <h2 className="text-3xl font-semibold text-green-500">Đổi mật khẩu thành công!</h2>
        <p className="text-gray-700">Chúc mừng! Bạn đã đổi mật khẩu thành công. Hãy quay lại trang chủ để tiếp tục.</p>
        <button
          onClick={handleGoHome}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Quay lại trang chủ
        </button>
      </div>
    </div>
  );
};

export default PasswordChangeSuccess;
