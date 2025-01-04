import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Các component
import { API_URL } from "../../config/webpack.config";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import Login from "../components/Login";
import ResetPassword from "../components/ResetPassword";
import SignUp from "../components/SignUp";
import ConfirmPopup from "../components/confirmpopup";
import PageNotFound from "../layouts/PageNotFound";
import UserLayout from "../layouts/UserLayout/UserLayout";
import Cart from "../pages/Cart/Cart";
import CheckoutInfo from "../pages/Checkout/CheckoutInfo";
import CheckoutPayment from "../pages/Checkout/CheckoutPayment";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import UserPage from "../pages/UserPage";
import CategoryPage from "../components/CategoryPage";

const PrivateRoute = ({ element }) => {
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
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return element; // Render component nếu xác thực thành công
  } else {
    // Nếu chưa xác thực, chuyển hướng đến login
    return <Navigate to="/login" replace />;
  }
};

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Các route không yêu cầu authentication */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route path="/confirm" element={<ConfirmPopup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Các route cần bảo vệ */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />

          {/* Các route bảo vệ */}
          <Route path="/category/:category" element={<PrivateRoute element={<CategoryPage />} />} />
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
