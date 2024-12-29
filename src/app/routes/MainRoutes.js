import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import PageNotFound from "../layouts/PageNotFound";
import UserLayout from "../layouts/UserLayout/UserLayout";

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}