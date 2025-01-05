import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiUser, CiSearch, CiShoppingBasket } from "react-icons/ci";
import Logo from "../../assets/image/resized_image_5_3.png";
import NewDropdown from "./partials/NewDropdown";
import logoutAcc from "../../modules/Logout/logoutAcc";
import { API_URL } from "../../../config/webpack.config";
import SearchBar from "../../components/SearchBar/SearchBar";

function Header() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = true;

  // Chuyển đến trang User hoặc Login
  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate("/user");
    } else {
      navigate("/login");
    }
  };

  // Xử lý đăng xuất
  const handleLogout = async () => {
    try {
      await logoutAcc();
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout:", error.message);
    }
  };

  // Xử lý khi người dùng nhập từ khóa
  const handleSearch = async (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);

    if (keyword.length >= 1) {
      try {
        const response = await fetch(`${API_URL}/api/products/search?keyword=${keyword}`);
        if (!response.ok) throw new Error("Lỗi tìm kiếm sản phẩm");
        const data = await response.json();
        setSuggestions(data.products);
      } catch (error) {
        console.error("Lỗi tìm kiếm:", error.message);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Xử lý khi người dùng nhấn Enter
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate("/search-results", { state: { products: suggestions } });
      setSearchKeyword("");
      setSuggestions([]);
    } else {
      setError("Vui lòng nhập từ khóa tìm kiếm.");
    }
  };

  // Xử lý khi người dùng click vào một gợi ý
  const handleSuggestionClick = (productId) => {
    setSearchKeyword("");
    setSuggestions([]);
    navigate(`/product/${productId}`);
  };

  // Menu Dropdown (User Profile / Logout)
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
        {/* Logo */}
        <Link to="/" target="_top" className="flex items-center">
          <img src={Logo} alt="Logo" className="max-h-[100px] object-contain" />
        </Link>
        <SearchBar />
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
