import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { getUserProfile, updateUserProfile, sendPasswordResetEmail } from "../../modules/UserPageApi/UserPageApi";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getUserProfile();
      setUser(result);
    } catch (error) {
      setError(error.message);
      setUser(null);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("success")
    if (!user) {
      fetchUserProfile();
    }
  }, []);

  const [editingField, setEditingField] = useState(null);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  const handleSave = async (field) => {
    try {
      const updatedData = { [field]: user[field] };
      const result = await updateUserProfile(updatedData);
      setUser(result.user);
      setEditingField(null);
    } catch (error) {
      console.error("Cập nhật thông tin thất bại:", error.message);
    }
  };

  const handleAvatarSave = async () => {
    try {
      const updatedData = { avatar: user.avatar };
      const result = await updateUserProfile(updatedData);
      setUser(result.user);
      setIsEditingAvatar(false);
    } catch (error) {
      console.error("Cập nhật avatar thất bại:", error.message);
    }
  };

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

  const handleChangePassword = async () => {
    try {
      const result = await sendPasswordResetEmail(user.email);
      message.success("Đã gửi email hướng dẫn đổi mật khẩu!");
    } catch (err) {
      message.error(err.message);
    }
  };

  if (!user) {
    return null;
  }

  const handleCloseModal = () => {
    setError("");
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
                <p className="text-lg font-semibold text-[#283149]">{user[field]}</p>
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
            <p className="text-lg font-semibold text-[#283149]">{user.email}</p>
          </div>
        </div>

        {/* Đổi mật khẩu */}
        <div className="mb-6 mt-8 flex justify-between items-center">
          <label className="text-lg font-semibold text-[#283149]">Đổi mật khẩu</label>
          <button
            onClick={() => handleChangePassword()}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
          >
            Đổi mật khẩu
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
