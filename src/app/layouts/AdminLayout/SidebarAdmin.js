import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaBoxOpen, FaTags, FaUsers, FaShoppingCart } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import logoutAcc from "../../modules/Logout/logoutAcc";

export default function SidebarAdmin() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleClick = (path) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await logoutAcc();
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout:", error.message);
    }
  };

  return (
    <div className="flex flex-col fixed top-0 left-0 bottom-0 w-64 bg-[#2C2C2C] text-[#FFF6E3] z-50">
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="mb-5 border bg-[#FFF6E3] h-16 flex items-center cursor-pointer"
      >
        <p className="text-xl font-bold pl-3 text-[#B76E79]">Admin Account</p>
      </div>

      <ul className="flex-grow">
        <li
          onClick={() => handleClick("/admin/dashboard")}
          className={`flex items-center pl-5 w-full mt-4 h-12 cursor-pointer hover:text-[#FFF6E3] hover:border-r-4 hover:border-[#FFF6E3] ${
            isActive("/admin/dashboard") ? "border-r-4 border-[#B76E79] text-[#B76E79]" : "text-[#D4D4D4]"
          }`}
        >
          <FaTachometerAlt
            className={`mr-2 ${
              isActive("/admin/dashboard") ? "text-[#B76E79]" : "text-[#D4D4D4] hover:text-[#FFF6E3]"
            }`}
          />
          <p>Dashboard</p>
        </li>
        <li
          onClick={() => handleClick("/admin/product")}
          className={`flex items-center pl-5 w-full mt-4 h-12 cursor-pointer hover:text-[#FFF6E3] hover:border-r-4 hover:border-[#FFF6E3] ${
            isActive("/admin/product") ? "border-r-4 border-[#B76E79] text-[#B76E79]" : "text-[#D4D4D4]"
          }`}
        >
          <FaBoxOpen
            className={`mr-2 ${
              isActive("/admin/product") ? "text-[#B76E79]" : "text-[#D4D4D4] hover:text-[#FFF6E3]"
            }`}
          />
          <p>Product</p>
        </li>
        <li
          onClick={() => handleClick("/admin/coupons")}
          className={`flex items-center pl-5 w-full mt-4 h-12 cursor-pointer hover:text-[#FFF6E3] hover:border-r-4 hover:border-[#FFF6E3] ${
            isActive("/admin/coupons") ? "border-r-4 border-[#B76E79] text-[#B76E79]" : "text-[#D4D4D4]"
          }`}
        >
          <FaTags
            className={`mr-2 ${
              isActive("/admin/coupons") ? "text-[#B76E79]" : "text-[#D4D4D4] hover:text-[#FFF6E3]"
            }`}
          />
          <p>Coupons</p>
        </li>
        <li
          onClick={() => handleClick("/admin/user")}
          className={`flex items-center pl-5 w-full mt-4 h-12 cursor-pointer hover:text-[#FFF6E3] hover:border-r-4 hover:border-[#FFF6E3] ${
            isActive("/admin/user") ? "border-r-4 border-[#B76E79] text-[#B76E79]" : "text-[#D4D4D4]"
          }`}
        >
          <FaUsers
            className={`mr-2 ${
              isActive("/admin/user") ? "text-[#B76E79]" : "text-[#D4D4D4] hover:text-[#FFF6E3]"
            }`}
          />
          <p>Users</p>
        </li>
        <li
          onClick={() => handleClick("/admin/order")}
          className={`flex items-center pl-5 w-full mt-4 h-12 cursor-pointer hover:text-[#FFF6E3] hover:border-r-4 hover:border-[#FFF6E3] ${
            isActive("/admin/order") ? "border-r-4 border-[#B76E79] text-[#B76E79]" : "text-[#D4D4D4]"
          }`}
        >
          <FaShoppingCart
            className={`mr-2 ${
              isActive("/admin/order") ? "text-[#B76E79]" : "text-[#D4D4D4] hover:text-[#FFF6E3]"
            }`}
          />
          <p>Orders</p>
        </li>
      </ul>

      <div
        onClick={handleLogout}
        className="flex items-center pl-5 w-full h-12 mb-6 cursor-pointer hover:text-rose-500 hover:border-r-4 hover:border-rose-500 text-[#D4D4D4]"
      >
        <IoLogOut className="mr-2" />
        <p>Logout</p>
      </div>
    </div>
  );
}