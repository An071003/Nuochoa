import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiUser, CiSearch, CiShoppingBasket } from "react-icons/ci";
import Logo from "../../assets/image/resized_image_5_3.png";
import { API_URL } from "../../../config/webpack.config";

function Header() {
  const navigate = useNavigate();

  // State để lưu thông tin người dùng và xử lý loading/error
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <header className="bg-[#FFF6E3] text-[#283149] sticky top-0 z-50">
      <div className="container mx-auto flex justify-center gap-40 items-center">
        {/* Logo */}
        <Link to="/" target="_top" className="flex items-center">
          <img src={Logo} alt="Logo" className="max-h-[100px] object-contain" />
        </Link>

        <div className="relative w-[600px]">
          {/* Hộp tìm kiếm */}
          <div className="flex justify-around items-center w-[full] bg-white rounded-full px-3 py-1 border border-[#283149]">
            <input
              type="text"
              placeholder="Nhập tên sản phẩm..."
              className="flex-grow text-black text-sm px-2 py-1 rounded-l-full focus:outline-none"
            />
            <button className="text-[#283149] text-2xl px-3 hover:text-opacity-80">
              <CiSearch />
            </button>
          </div>

          {/* Gợi ý tìm kiếm */}
          <div className="absolute bottom-[-30px] left-0 w-full flex justify-center space-x-4 pt-2 text-sm">
            <Link to="/category/Nước hoa nam" className="hover:underline cursor-pointer">
              Nước hoa nam
            </Link>
            <Link to="/category/Nước hoa nữ" className="hover:underline cursor-pointer">
              Nước hoa nữ
            </Link>
            <Link to="/category/Nước unisex" className="hover:underline cursor-pointer">
              Nước unisex
            </Link>
          </div>
        </div>

        {/* Nút user và giỏ hàng */}
        <div className="flex items-center space-x-4">
          <Link to="/user"
            className="bg-[#283149] text-white px-3 py-2 rounded-full hover:bg-opacity-80"
          >
            <CiUser className="w-5 h-5" />
          </Link>

          <Link
            to="/cart"
            className="bg-[#283149] text-white px-3 py-2 rounded-full hover:bg-opacity-80 flex items-center"
          >
            <CiShoppingBasket className="w-5 h-5" />
            <span className="ml-2 text-sm font-medium">Giỏ hàng</span>
          </Link>
        </div>
      </div>

      {/* Hiển thị thông báo lỗi nếu có */}
      {error && (
        <div className="absolute top-0 left-0 right-0 bg-red-500 text-white py-2 text-center">
          {error}
        </div>
      )}
    </header>
  );
}

export default Header;
