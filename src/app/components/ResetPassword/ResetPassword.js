import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import icon từ react-icons
import { API_URL } from "../../../config/webpack.config";
import ErrorModal from "../errorbox/errorbox";

const ResetPassword = () => {
  const { token } = useParams(); // Token từ URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false); // Kiểm tra token hợp lệ
  const [checkingToken, setCheckingToken] = useState(true); // Trạng thái kiểm tra token
  const [showPassword, setShowPassword] = useState(false); // Trạng thái hiển thị mật khẩu
  const navigate = useNavigate();

  // Kiểm tra token khi trang được tải
  useEffect(() => {
    const verifyToken = async () => {
      try {
        console.log("Verifying token:", token);

        const response = await fetch(`${API_URL}/api/auth/verify-reset-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const result = await response.json();
        console.log("API Response:", result);

        if (response.ok && result.valid) {
          setIsTokenValid(true);
        } else {
          setError(result.message || "Mã xác nhận không hợp lệ hoặc đã hết hạn.");
        }
      } catch (error) {
        console.error("Error during token verification:", error.message);
        setError("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
      } finally {
        setCheckingToken(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Kiểm tra độ dài mật khẩu
    if (newPassword.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    // Kiểm tra khớp giữa mật khẩu và xác nhận mật khẩu
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Mật khẩu đã được đặt lại thành công.");
        navigate("/login");
      } else {
        setError(result.message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
      }
    } catch (error) {
      setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingToken) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg font-semibold text-gray-700">Đang kiểm tra mã xác nhận...</div>
      </div>
    );
  }

  if (!isTokenValid) {
    return (
      <ErrorModal
        error={error || "Mã xác nhận không hợp lệ hoặc đã hết hạn."}
        onClose={() => navigate("/forgot-password")} // Điều hướng về trang quên mật khẩu
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Hiển thị lỗi nếu có */}
      {error && <ErrorModal error={error} onClose={() => setError("")} />}

      <div className="bg-white p-8 rounded shadow-md w-full max-w-[500px]">
        <h2 className="text-2xl font-bold text-center mb-4">Đặt lại mật khẩu</h2>
        <form onSubmit={handleResetPassword}>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"} // Thay đổi type dựa trên trạng thái
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Mật khẩu mới"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)} // Toggle trạng thái
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />} {/* Icon */}
            </button>
          </div>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"} // Thay đổi type dựa trên trạng thái
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Xác nhận mật khẩu"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)} // Toggle trạng thái
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />} {/* Icon */}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
