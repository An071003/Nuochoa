import { API_URL } from "../../../config/webpack.config";

// API request để lấy thông tin người dùng
export const getUserProfile = async () => {
  const response = await fetch(`${API_URL}/api/auth/profile`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Lỗi khi lấy thông tin người dùng. Vui lòng thử lại.");
  }
  return response.json();
};

// API request để cập nhật thông tin người dùng
export const updateUserProfile = async (updatedData) => {
  const response = await fetch(`${API_URL}/api/users/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Lỗi cập nhật thông tin.");
  }

  return response.json();
};

// API request để gửi yêu cầu đổi mật khẩu
export const sendPasswordResetEmail = async (email) => {
  const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
  }

  return result;
};
