import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";

// Các component
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart/Cart";
import CheckoutInfo from "../pages/Checkout/CheckoutInfo";
import CheckoutPayment from "../pages/Checkout/CheckoutPayment";
import UserPage from "../pages/UserPage";
import PageNotFound from "../layouts/PageNotFound";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import VerifyCode from "../components/VerifyCode";
import ConfirmPopup from "../components/confirmpopup";
import UserLayout from "../layouts/UserLayout/UserLayout";
import { API_URL } from "../../config/webpack.config";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import ResetPassword from "../components/ResetPassword";

// Component PrivateRoute để kiểm tra xác thực
const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate(); // Khởi tạo hook useNavigate

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/protectRoute`, {
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
    return element; // Render component nếu xác thực thành công
  } else {
    // Nếu chưa xác thực, chuyển hướng đến login
    navigate("/login", { replace: true }); 
    return null; // Không render gì khi đang chuyển hướng
  }
};

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Các route không yêu cầu authentication */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/confirm" element={<ConfirmPopup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Các route cần bảo vệ */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />

          {/* Các route bảo vệ */}
          <Route path="/product/:id" element={<PrivateRoute element={<ProductDetail />} />} />
          <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
          <Route path="/checkout/info" element={<PrivateRoute element={<CheckoutInfo />} />} />
          <Route path="/checkout/payment" element={<PrivateRoute element={<CheckoutPayment />} />} />
          <Route path="/user" element={<PrivateRoute element={<UserPage />} />} />
        </Route>

        {/* Route fallback cho trang không tìm thấy */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
