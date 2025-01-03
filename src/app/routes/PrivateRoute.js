// src/app/routes/PrivateRoute.js

import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { API_URL } from "../../config/webpack.config";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/verify-token`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Đảm bảo gửi cookies (token)
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Lỗi xác thực:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Chờ cho quá trình xác thực hoàn tất
  }

  if (isAuthenticated) {
    return children; // Render component nếu xác thực thành công
  } else {
    // Nếu chưa xác thực, chuyển hướng đến login
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
