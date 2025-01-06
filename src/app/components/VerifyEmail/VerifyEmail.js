import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL } from "../../../config/webpack.config";

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/verify-email/${token}`);
        const result = await response.json();
        
        if (response.ok) {
          setMessage("Email xác thực thành công! Bạn có thể đăng nhập ngay.");
        } else {
          setMessage(result.message || "Xác thực email thất bại.");
        }
      } catch (error) {
        setMessage("Có lỗi xảy ra.");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
