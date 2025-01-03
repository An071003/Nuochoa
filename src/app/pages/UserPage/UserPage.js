import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialUser = location.state?.user;

  const [user, setUser] = useState(initialUser);
  const [editingField, setEditingField] = useState(null);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = (field) => {
    setEditingField(null);
    console.log(`Updated ${field}:`, user[field]);
    // You can send updated user info to an API here
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

  const handleAvatarSave = () => {
    setIsEditingAvatar(false);
    console.log("Updated avatar:", user.avatar);
    // You can send the updated avatar to an API here
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center text-[#283149] mb-6">
        Thông Tin Người Dùng
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto">
        <div className="mb-4 text-center">
          <img
            src={user?.avatar || "https://via.placeholder.com/150"}
            alt="Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4"
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
                Lưu
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

        {[
          { label: "Username", field: "username" },
          { label: "First Name", field: "firstname" },
          { label: "Last Name", field: "lastname" },
          { label: "Email", field: "email" },
          { label: "Hash Password", field: "hashPassword" },
        ].map(({ label, field }) => (
          <div className="mb-4" key={field}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            {editingField === field ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  name={field}
                  value={user[field] || ""}
                  onChange={handleInputChange}
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
                <p className="text-lg font-semibold">{user[field] || "Chưa cập nhật"}</p>
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
      </div>
    </div>
  );
};

export default UserPage;