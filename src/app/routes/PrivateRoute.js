import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../modules/VerifyToken/VerifyToken"; // Import hàm kiểm tra token

const PrivateRoute = ({ element, roles = [] }) => {
  const [userRole, setUserRole] = useState(null); // Lưu trữ role của người dùng
  const [loading, setLoading] = useState(true); // Trạng thái loading

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        await checkAuth(setUserRole); // Kiểm tra xác thực người dùng và cập nhật role
      } catch (error) {
        console.error("Lỗi khi xác thực:", error.message);
      } finally {
        setLoading(false); // Đã xong quá trình xác thực
      }
    };

    authenticateUser();
  }, []);

  // Nếu đang loading, hiển thị loading spinner hoặc thông báo
  if (loading) {
    return <div>Loading...</div>;
  }

  // Nếu không có token hoặc không phải user hợp lệ
  if (userRole === null) {
    return <Navigate to="/" replace />;
  }

  // Kiểm tra role nếu có roles được truyền vào
  if (roles.length > 0 && !roles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default PrivateRoute;
