import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiUser, CiSearch, CiShoppingBasket } from "react-icons/ci";
import Logo from "../../assets/image/resized_image_5_3.png";

function Header() {
  const navigate = useNavigate();

  // User mẫu
  const user = {
    username: "johndoe",
    firstname: "John",
    lastname: "Doe",
    email: "johndoe@example.com",
    hashPassword: "12345hashedpassword",
    avatar: "https://via.placeholder.com/150"
  };

  const isLoggedIn = true; // Thay bằng trạng thái thực tế của ứng dụng bạn

  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate("/user", { state: { user } });
    } else {
      navigate("/login");
    }
  };

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
            <span className="hover:underline cursor-pointer">Nước hoa nam</span>
            <span className="hover:underline cursor-pointer">Nước hoa nữ</span>
            <span className="hover:underline cursor-pointer">Nước hoa unisex</span>
            <span className="hover:underline cursor-pointer">All Product</span>
            <span className="hover:underline cursor-pointer">Về Maison</span>
          </div>
        </div>

        {/* Nút user và giỏ hàng */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleUserClick}
            className="bg-[#283149] text-white px-3 py-2 rounded-full hover:bg-opacity-80"
          >
            <CiUser className="w-5 h-5" />
          </button>
          <Link
            to="/cart"
            className="bg-[#283149] text-white px-3 py-2 rounded-full hover:bg-opacity-80 flex items-center"
          >
            <CiShoppingBasket className="w-5 h-5" />
            <span className="ml-2 text-sm font-medium">Giỏ hàng</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
