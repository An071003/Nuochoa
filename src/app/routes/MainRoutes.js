import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import ResetPassword from "../components/ResetPassword";
import PrivateRoute from "./PrivateRoute"; // Đảm bảo import đúng PrivateRoute

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
          <Route path="/product/:id" element={<PrivateRoute><ProductDetail /></PrivateRoute>} />
          <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
          <Route path="/checkout/info" element={<PrivateRoute><CheckoutInfo /></PrivateRoute>} />
          <Route path="/checkout/payment" element={<PrivateRoute><CheckoutPayment /></PrivateRoute>} />
          <Route path="/user" element={<PrivateRoute><UserPage /></PrivateRoute>} />
        </Route>

        {/* Route fallback cho trang không tìm thấy */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
