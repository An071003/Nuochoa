import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiUser, CiSearch, CiShoppingBasket } from "react-icons/ci";
import Logo from "../../assets/image/resized_image_5_3.png";
import NewDropdown from "./partials/NewDropdown";
import logoutAcc from "../../modules/Logout/logoutAcc";
import { API_URL } from "../../../config/webpack.config";

function Header() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
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
      }
    } else {
      setSuggestions([]);
    }
  };

  // Khi người dùng nhấn Enter
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

  const handleSuggestionClick = (productId) => {
    setSearchKeyword("");
    setSuggestions([]);
    navigate(`/product/${productId}`);
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

        {/* Thanh tìm kiếm */}
        <form className="relative w-[600px]" onSubmit={handleSearchSubmit}>
          <div className="flex justify-around items-center bg-white rounded-full px-3 py-1 border border-[#283149]">
            <input
              type="text"
              placeholder="Nhập từ khóa tìm kiếm..."
              className="flex-grow text-black text-sm px-2 py-1 rounded-l-full focus:outline-none"
              value={searchKeyword}
              onChange={handleSearch}
            />
            <button
              type="submit"
              className="text-[#283149] text-2xl px-3 hover:text-opacity-80"
            >
              <CiSearch />
            </button>
          </div>

          {/* Danh sách gợi ý */}
          {searchKeyword.length > 1 && (
            <div className="absolute bg-white border border-gray-300 rounded-md w-full mt-1 max-h-60 overflow-y-auto shadow-lg z-10">
              {suggestions.length > 0 ? (
                <ul>
                  {suggestions.map((product) => (
                    <li
                      key={product._id}
                      onClick={() => handleSuggestionClick(product._id)}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      {product.name} - {product.brand}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="p-2 text-center text-gray-500">Không có sản phẩm nào.</p>
              )}
            </div>
          )}

          {/* Danh mục phổ biến (ẩn khi có gợi ý) */}
          {!searchKeyword || suggestions.length === 0 ? (
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
          ) : null}
        </form>

        {/* Dropdown và giỏ hàng */}
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
