import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import CheckoutInfo from "../pages/Checkout/CheckoutInfo";
import CheckoutPayment from "../pages/Checkout/CheckoutPayment";
import PageNotFound from "../layouts/PageNotFound";
import UserLayout from "../layouts/UserLayout/UserLayout";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart/Cart";
import VerifyCode from "../components/VerifyCode";
import Login from "../components/Login";
import ConfirmPopup from "../components/confirmpopup";
import UserPage from "../pages/UserPage";

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/verify-code" element={<VerifyCode />} />

        <Route path="/confirm" element={<ConfirmPopup />} />
        <Route path="/checkout/info" element={<CheckoutInfo />} />
        <Route path="/checkout/Payment" element={<CheckoutPayment />} />
        <Route path="/user" element={<UserPage />} />
        {/* Add more routes if necessary for payment */}
        {/* <Route path="/checkout/payment" element={<CheckoutPayment />} /> */}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
