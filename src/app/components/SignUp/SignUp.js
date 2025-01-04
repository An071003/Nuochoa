import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { API_URL } from "../../../config/webpack.config";
import ErrorModal from "../errorbox/errorbox";

const SuccessModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-auto">
        <p className="text-lg font-semibold mb-4 text-green-500">{message}</p>
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

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp!");
      setLoading(false);
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Email không hợp lệ!");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }), 
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess("Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.");
      } else {
        setError(result.message || "Đăng ký thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseErrorModal = () => {
    setError("");
  };

  const handleCloseSuccessModal = () => {
    setSuccess(""); 
    navigate("/login"); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Show Error Modal if there's an error */}
      {error && <ErrorModal error={error} onClose={handleCloseErrorModal} />}

      {/* Show Success Modal if there's a success message */}
      {success && <SuccessModal message={success} onClose={handleCloseSuccessModal} />}

      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Đăng ký</h2>
        <p className="text-gray-600 text-center mb-6">
          Nhập thông tin của bạn để tạo tài khoản
        </p>

        {/* Name Input */}
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên"
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Email Input */}
        <input

          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password Input */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mật khẩu"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
          </button>
        </div>

        {/* Confirm Password Input */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Xác nhận mật khẩu"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
          </button>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>

        {/* Login Redirect Button */}
        <div className="mt-4 text-center">
          <span className="text-gray-600">Bạn đã có tài khoản? </span>
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:text-blue-600 transition"
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}
