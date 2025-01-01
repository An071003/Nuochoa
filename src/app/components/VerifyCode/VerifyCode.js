import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyCode() {
  const [code, setCode] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleVerify = () => {
    if (code === "123456") {
      alert("Đăng nhập thành công!");
      navigate("/");
    } else {
      alert("Mã xác minh không đúng!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Nhập mã</h2>
        <p className="text-gray-600 text-center mb-6">Đã gửi đến {email}</p>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Mã 6 chữ số"
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleVerify}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}
