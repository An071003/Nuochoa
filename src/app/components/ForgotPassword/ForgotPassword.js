import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ErrorModal Component
const ErrorModal = ({ error, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-auto">
        <p className="text-lg font-semibold mb-4">{error}</p>
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

// SuccessModal Component
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

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // For error messages
  const [success, setSuccess] = useState(""); // For success messages
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate();

  // Handle Forgot Password submission
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError(""); // Reset any previous error
    setSuccess(""); // Reset success message
    setLoading(true); // Start loading

    try {
      const response = await fetch("http://localhost:5001/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Send the email to the backend
      });

      const result = await response.json();

      if (response.ok) {
        // If request is successful, show success message
        setSuccess("Đã gửi email hướng dẫn reset mật khẩu!"); // Set success message
      } else {
        setError(result.message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
      }
    } catch (error) {
      setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Close the error modal
  const handleCloseErrorModal = () => {
    setError(""); // Reset error when closing modal
  };

  // Close the success modal and navigate to login
  const handleCloseSuccessModal = () => {
    setSuccess(""); // Reset success when closing modal
    navigate("/login"); // Redirect to login page
  };

  // Navigate back to login page
  const handleBackToLogin = () => {
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Show Error Modal if there's an error */}
      {error && <ErrorModal error={error} onClose={handleCloseErrorModal} />}

      {/* Show Success Modal if there's a success message */}
      {success && <SuccessModal message={success} onClose={handleCloseSuccessModal} />}

      <div className="bg-white p-8 rounded shadow-md w-full max-w-[500px]">
        <h2 className="text-2xl font-bold text-center mb-4">Quên mật khẩu</h2>
        <p className="text-gray-600 text-center mb-6">
          Nhập email của bạn để nhận hướng dẫn đổi mật khẩu
        </p>

        {/* Email Input */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Submit Button */}
        <button
          onClick={handleForgotPassword}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Đang xử lý..." : "Gửi yêu cầu"}
        </button>

        {/* Back to Login Button */}
        <div className="mt-4 text-center">
          <button
            onClick={handleBackToLogin}
            className="text-blue-500 hover:text-blue-600 transition"
          >
            Quay lại đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}
