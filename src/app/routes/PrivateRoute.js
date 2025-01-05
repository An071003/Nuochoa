import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../modules/VerifyToken/VerifyToken";

const PrivateRoute = ({ element, roles = [] }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const authenticateUser = async () => {
      try {
        await checkAuth(setUserRole);
      } catch (error) {
        console.error("Lỗi khi xác thực:", error.message);
      } finally {
        setLoading(false);
      }
    };

    authenticateUser();
  }, []);

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
