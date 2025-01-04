import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { API_URL } from "../../../config/webpack.config";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Hàm lấy thông tin người dùng
  const getUserProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/auth/profile`, {
        method: "GET",
        credentials: "include", // Đảm bảo cookies được gửi kèm theo yêu cầu
      });

      if (!response.ok) {
        throw new Error("Lỗi khi lấy thông tin người dùng. Vui lòng thử lại.");
      }

      const result = await response.json();
      setUser(result); // Cập nhật thông tin người dùng vào state
    } catch (error) {
      setError(error.message); // Xử lý lỗi
      setUser(null); // Nếu có lỗi, đặt user = null
      navigate("/login"); // Chuyển hướng đến trang login nếu có lỗi
    } finally {
      setLoading(false); // Kết thúc quá trình loading
    }
  };

  // Gọi getUserProfile khi UserPage được render
  useEffect(() => {
    if (!user) {
      getUserProfile();
    }
  }, []); // Chỉ gọi một lần khi component mount

  const [editingField, setEditingField] = useState(null);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });

  const updateUserProfile = async (updatedData) => {
    try {
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

      const result = await response.json();
      setUser(result.user); // Cập nhật người dùng sau khi thay đổi thông tin
    } catch (error) {
      console.error("Error in updateUserProfile:", error.message);
    }
  };

  // Lưu thông tin chỉnh sửa
  const handleSave = async (field) => {
    try {
      const updatedData = { [field]: user[field] };
      await updateUserProfile(updatedData); // Gọi API để cập nhật
      setEditingField(null); // Tắt chế độ chỉnh sửa
    } catch (error) {
      console.error("Cập nhật thông tin thất bại:", error.message);
    }
  };

  // Lưu avatar
  const handleAvatarSave = async () => {
    try {
      const updatedData = { avatar: user.avatar };
      await updateUserProfile(updatedData); // Gọi API để cập nhật avatar
      setIsEditingAvatar(false); // Tắt chế độ chỉnh sửa avatar
    } catch (error) {
      console.error("Cập nhật avatar thất bại:", error.message);
    }
  };

  // Xử lý thay đổi avatar
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return <div>Đang tải...</div>; // Hiển thị khi đang tải dữ liệu
  }

  // Kiểm tra nếu chưa có user thì không render các field để tránh lỗi
  if (!user) {
    return null; // Hoặc có thể hiển thị một loading hoặc thông báo khác
  }
  const handleCloseModal = () => {
    setError(""); // Reset error when closing modal
  };

  return (
    <div className="container mx-auto py-10">
      {/* Thông báo lỗi hoặc thành công */}
      {error && <ErrorModal error={error} onClose={handleCloseModal} >{error}</ErrorModal>}
      <h1 className="text-3xl font-bold text-center text-[#283149] mb-6">
        Thông Tin Người Dùng
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-6 min-w-[60%] max-w-[60%] mx-auto px-28">

        {/* Avatar */}
        <div className="mb-4 text-center">
          <img
            src={user?.avatar || "https://via.placeholder.com/150"}
            alt="Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-[#283149]"
          />
          {isEditingAvatar ? (
            <div className="flex flex-col items-center space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <button
                onClick={handleAvatarSave}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
              >
                Lưu Avatar
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditingAvatar(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Thay đổi avatar
            </button>
          )}
        </div>

        {/* Thông tin người dùng */}
        {[{ label: "Tên", field: "name" }].map(({ label, field }) => (
          <div className="mb-4" key={field}>
            <label className="block text-sm font-medium text-[#283149]">{label}</label>
            {editingField === field ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  name={field}
                  value={user[field] || ""}
                  onChange={(e) => setUser({ ...user, [field]: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button
                  onClick={() => handleSave(field)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                >
                  Lưu
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-[#283149]">{user[field] || "Chưa cập nhật"}</p>
                <button
                  onClick={() => setEditingField(field)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
                >
                  Chỉnh sửa
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Không hiển thị phần chỉnh sửa email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#283149]">Email</label>
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">{user.email || "Chưa cập nhật"}</p>
          </div>
        </div>

        {/* Đổi mật khẩu */}
        <div className="mb-6">
          <label className="block text-sm font-sans text-[#283149]">Đổi mật khẩu</label>
          {isEditingPassword ? (
            <div className="space-y-4">
              <input
                type="password"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                placeholder="Mật khẩu hiện tại"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                placeholder="Mật khẩu mới"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <button
                onClick={() => {
                  setIsEditingPassword(false);
                  console.log("Mật khẩu đã đổi:", passwords);
                }}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
              >
                Lưu mật khẩu
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditingPassword(true)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
            >
              Đổi mật khẩu
            </button>
          )}
        </div>

        {/* Lịch sử đặt hàng */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Lịch sử đặt hàng</label>
          <div className="bg-gray-100 p-4 rounded-lg max-h-48 overflow-y-auto">
            {user?.orders?.length > 0 ? (
              <ul className="list-disc pl-5">
                {user.orders.map((order, index) => (
                  <li key={index} className="mb-2">
                    <p className="text-sm">
                      <strong>Order ID:</strong> {order._id}
                    </p>
                    <p className="text-sm">
                      <strong>Ngày đặt:</strong> {new Date(order.createdAt).toLocaleString()}
                    </p>
                    <p className="text-sm">
                      <strong>Tổng tiền:</strong> {order.totalPrice} VND
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Không có lịch sử đặt hàng.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
