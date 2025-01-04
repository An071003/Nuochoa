import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import icons
import { API_URL } from "../../../config/webpack.config";
import ErrorModal from "../errorbox/errorbox";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [rememberMe, setRememberMe] = useState(false); // Remember Me state
  const [error, setError] = useState(""); // For error message
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous errors
    setLoading(true); // Start loading

    // Check if email is a valid Gmail address
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      setError("Vui lòng nhập địa chỉ Gmail hợp lệ!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Send email and password
        credentials: "include", // Important: This ensures cookies are sent and received
      });

      const result = await response.json();

      if (response.ok) {
        // If login is successful, redirect to home page or dashboard
        console.log("Login successful", result);
        if (result.role === "admin") {
          navigate("/");
        } else {
          navigate("/");
        }
      } else {
        setError(result.message || "Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Close the error modal
  const handleCloseModal = () => {
    setError(""); // Reset error when closing modal
  };

  // Navigate to the signup page
  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  // Navigate to the Forgot Password page
  const handleForgotPasswordRedirect = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

      {/* Show Error Modal if there's an error */}
      {error && <ErrorModal error={error} onClose={handleCloseModal} />}

      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Đăng nhập</h2>
        <p className="text-gray-600 text-center mb-6">
          Nhập email và mật khẩu của bạn để đăng nhập
        </p>

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

        {/* Remember Me */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="rememberMe" className="text-gray-600">
            Ghi nhớ đăng nhập
          </label>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        {/* Signup Redirect Button */}
        <div className="mt-4 text-center">
          <span className="text-gray-600">Chưa có tài khoản? </span>
          <button
            onClick={handleSignupRedirect}
            className="text-blue-500 hover:text-blue-600 transition"
          >
            Đăng ký
          </button>
        </div>

        {/* Forgot Password Button */}
        <div className="mt-4 text-center">
          <button
            onClick={handleForgotPasswordRedirect}
            className="text-blue-500 hover:text-blue-600 transition"
          >
            Quên mật khẩu?
          </button>
        </div>
      </div>
    </div>
  );
}
