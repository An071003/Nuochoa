import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

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
import SearchResults from "../pages/SearchResults";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <RoutesWrapper />
    </BrowserRouter>
  );
};

const RoutesWrapper = () => {
  const location = useLocation();
  return (
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
          path="/search-results"
          element={<PrivateRoute key={location.pathname} element={<SearchResults />} roles={["customer"]} />}
        />
        <Route
          path="/category/:category"
          element={<PrivateRoute key={location.pathname} element={<CategoryPage />} roles={["customer"]} />}
        />
        <Route
          path="/product/:id"
          element={<PrivateRoute key={location.pathname} element={<ProductDetail />} roles={["customer"]} />}
        />
        <Route
          path="/cart"
          element={<PrivateRoute key={location.pathname} element={<Cart />} roles={["customer"]} />}
        />
        <Route
          path="/checkout/info"
          element={<PrivateRoute key={location.pathname} element={<CheckoutInfo />} roles={["customer"]} />}
        />
        <Route
          path="/checkout/payment"
          element={<PrivateRoute key={location.pathname} element={<CheckoutPayment />} roles={["customer"]} />}
        />
        <Route
          path="/user"
          element={<PrivateRoute key={location.pathname} element={<UserPage />} roles={["customer"]} />}
        />
      </Route>

      {/* Route dành cho admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route
          path="product"
          element={<PrivateRoute key={location.pathname} element={<ProductList />} roles={["admin"]} />}
        />
        <Route
          path="dashboard"
          element={<PrivateRoute key={location.pathname} element={<Dashboard />} roles={["admin"]} />}
        />
        <Route
          path="coupons"
          element={<PrivateRoute key={location.pathname} element={<Coupons />} roles={["admin"]} />}
        />
        <Route
          path="user"
          element={<PrivateRoute key={location.pathname} element={<UserList />} roles={["admin"]} />}
        />
        <Route
          path="order"
          element={<PrivateRoute key={location.pathname} element={<OrderList />} roles={["admin"]} />}
        />
      </Route>

      {/* Route không tồn tại */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default MainRoutes;
