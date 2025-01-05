import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Các component
import { API_URL } from "../../config/webpack.config";
import CategoryPage from "../components/CategoryPage";
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
import AdminLayout from "../layouts/AdminLayout/AdminLayout"
import ProductList from "../pages/Admin/ProductManage/ProductList";
import Dashboard from "../pages/Admin/Dashboard/Dashboard"
import Coupons from "../pages/Admin/Coupons/Coupons"
import OrderList from "../pages/Admin/OrderManage/OrderList"
import UserList from "../pages/Admin/UserManage/UserList"
import PasswordChangeSuccess from "../components/PasswordChangeSuccess"

const PrivateRoute = ({ element, roles }) => {
  const [userRole, setUserRole] = useState(null);
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
          const data = await response.json();
          setUserRole(data.role); // Lấy role từ response
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

  if (isAuthenticated && roles.includes(userRole)) {
    return element; // Render component nếu xác thực thành công và vai trò phù hợp
  } else {
    return <Navigate to="/login" replace />; // Chuyển hướng đến login nếu không hợp lệ
  }
};

const AdminRoute = ({ element }) => {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/check-admin`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Đảm bảo gửi cookies (token)
        });

        if (response.ok) {
          setIsAdmin(true); // Người dùng là admin
        } else {
          setIsAdmin(false); // Người dùng không phải admin
        }
      } catch (error) {
        console.error("Lỗi xác thực admin:", error);
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, []);

  if (isAdmin === null) {
    return <div>Loading...</div>; // Hiển thị trong khi chờ xác thực
  }

  if (isAdmin) {
    return element; // Render component nếu là admin
  } else {
    return <Navigate to="/" replace />; // Chuyển hướng nếu không phải admin
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
        <Route path="/reset-password/success" element={<PasswordChangeSuccess />} />
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
          <Route path="/category/:category" element={<PrivateRoute element={<CategoryPage/>}/>} />
        </Route>

        {/* Route dành cho admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="product" element={<AdminRoute element={<ProductList />} />} />
          <Route path="dashboard" element={<AdminRoute element={<Dashboard />} />} />
          <Route path="coupons" element={<AdminRoute element={<Coupons />} />} />
          <Route path="user" element={<AdminRoute element={<UserList />} />} />
          <Route path="order" element={<AdminRoute element={<OrderList />} />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
