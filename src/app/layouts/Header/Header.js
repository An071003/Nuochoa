import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiUser, CiSearch, CiShoppingBasket } from "react-icons/ci";
import Logo from "../../assets/image/resized_image_5_3.png";
import NewDropdown from "./partials/NewDropdown";
import logoutAcc from "../../modules/Logout/logoutAcc";

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = true;

  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate("/user");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAcc();
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout:", error.message);
    }
  };

  const menuItems = [
    {
      key: "1",
      label: (
        <button
          onClick={handleUserClick}
          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-sky-400 hover:rounded-lg"
        >
          User Profile
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-white bg-rose-500 rounded-lg hover:bg-rose-600"
        >
          Logout
        </button>
      ),
    },
  ];

  return (
    <header className="bg-[#FFF6E3] text-[#283149] sticky top-0 z-50">
      <div className="container mx-auto flex justify-center gap-40 items-center">
        <Link to="/" target="_top" className="flex items-center">
          <img src={Logo} alt="Logo" className="max-h-[100px] object-contain" />
        </Link>

        <div className="relative w-[600px]">
          <div className="flex justify-around items-center bg-white rounded-full px-3 py-1 border border-[#283149]">
            <input
              type="text"
              placeholder="Nhập tên sản phẩm..."
              className="flex-grow text-black text-sm px-2 py-1 rounded-l-full focus:outline-none"
            />
            <button className="text-[#283149] text-2xl px-3 hover:text-opacity-80">
              <CiSearch />
            </button>
          </div>

          <div className="absolute bottom-[-30px] left-0 w-full flex justify-center space-x-4 pt-2 text-sm">
            <span className="hover:underline cursor-pointer">Nước hoa nam</span>
            <span className="hover:underline cursor-pointer">Nước hoa nữ</span>
            <span className="hover:underline cursor-pointer">Nước hoa unisex</span>
            <span className="hover:underline cursor-pointer">All Product</span>
            <span className="hover:underline cursor-pointer">Về Maison</span>
          </div>
        </div>

        <div className="flex items-center space-x-4 relative">
          <NewDropdown
            menuItems={menuItems}
            triggerElement={
              <button className="bg-[#283149] text-white px-3 py-2 rounded-full hover:bg-opacity-80">
                <CiUser className="w-5 h-5" />
              </button>
            }
          />
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