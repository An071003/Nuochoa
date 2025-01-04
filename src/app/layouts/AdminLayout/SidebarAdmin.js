import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaBoxOpen, FaTags, FaUsers, FaShoppingCart } from "react-icons/fa"; // Import icons

export default function SidebarAdmin() {
  const location = useLocation(); // Lấy đường dẫn hiện tại
  const navigate = useNavigate(); // Hook để điều hướng

  // Kiểm tra nếu đang ở một route cụ thể
  const isActive = (path) => location.pathname === path;

  const handleClick = (path) => {
    navigate(path); // Điều hướng đến trang tương ứng
  };

  return (
    <div className="flex flex-col min-h-full min-w-64 bg-[#2C2C2C] text-[#FFF6E3]">
      <div className="sticky top-0">
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mb-5 border bg-[#FFF6E3] h-16 flex items-center cursor-pointer"
        >
          <p className="text-xl font-bold pl-3 text-[#B76E79]">Admin Account</p>
        </div>
        <div>
          <ul>
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
        </div>
      </div>
    </div>
  );
}