import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Các component
import CategoryPage from "../components/CategoryPage";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import Login from "../components/Login";
import PasswordChangeSuccess from "../components/PasswordChangeSuccess";
import ResetPassword from "../components/ResetPassword";
import SignUp from "../components/SignUp";
import ConfirmPopup from "../components/confirmpopup";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import PageNotFound from "../layouts/PageNotFound";
import UserLayout from "../layouts/UserLayout/UserLayout";
import Coupons from "../pages/Admin/Coupons/Coupons";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import OrderList from "../pages/Admin/OrderManage/OrderList";
import ProductList from "../pages/Admin/ProductManage/ProductList";
import UserList from "../pages/Admin/UserManage/UserList";
import Cart from "../pages/Cart/Cart";
import CheckoutInfo from "../pages/Checkout/CheckoutInfo";
import CheckoutPayment from "../pages/Checkout/CheckoutPayment";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import UserPage from "../pages/UserPage";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

// Routes chính
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
          {/* Trang chủ */}
          <Route path="/" element={<Home />} />

          {/* Các route bảo vệ */}
          <Route
            path="/category/:category"
            element={<PrivateRoute element={<CategoryPage />} roles={["customer"]} />}
          />
          <Route
            path="/product/:id"
            element={<PrivateRoute element={<ProductDetail />} roles={["customer"]} />}
          />
          <Route
            path="/cart"
            element={<PrivateRoute element={<Cart />} roles={["customer"]} />}
          />
          <Route
            path="/checkout/info"
            element={<PrivateRoute element={<CheckoutInfo />} roles={["customer"]} />}
          />
          <Route
            path="/checkout/payment"
            element={<PrivateRoute element={<CheckoutPayment />} roles={["customer"]} />}
          />
          <Route
            path="/user"
            element={<PrivateRoute element={<UserPage />} roles={["customer"]} />}
          />
        </Route>

        {/* Route dành cho admin */}
        <Route path="/admin" element={<AdminRoute element={<AdminLayout />}/>}>
          <Route path="product" element={<AdminRoute element={<ProductList />} />} />
          <Route path="dashboard" element={<AdminRoute element={<Dashboard />} />} />
          <Route path="coupons" element={<AdminRoute element={<Coupons />} />} />
          <Route path="user" element={<AdminRoute element={<UserList />} />} />
          <Route path="order" element={<AdminRoute element={<OrderList />} />} />
        </Route>

        {/* Route không tồn tại */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
