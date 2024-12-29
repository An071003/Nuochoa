import React, { useState } from "react";
import { CiUser, CiShoppingBasket, CiSearch } from "react-icons/ci";

function Header() {
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearchClick = () => {
    setIsSearchActive(!isSearchActive);
  };

  return (
    <header className="bg-[#4c0e0e] text-white py-4 sticky top-0 z-20">
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Nút Search */}
        <div className="flex items-center ml-[10%] relative">
          <button
            className="text-white text-xl transition-transform transform hover:scale-125"
            onClick={handleSearchClick}
          >
            <CiSearch />
          </button>

          {/* Thanh tìm kiếm */}
          {isSearchActive && (
            <div className="absolute top-full left-0 mt-2 w-[300px] bg-white rounded-md shadow-lg p-2 flex items-center z-30">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#4c0e0e] text-black"
              />
              <button
                className="ml-2 text-[#4c0e0e] font-bold"
                onClick={() => setIsSearchActive(false)}
              >
                X
              </button>
            </div>
          )}
        </div>

        {/* Logo và Tên thương hiệu */}
        <div className="text-center">
          <img
            src="https://via.placeholder.com/100x50"
            alt="Maison Du Parfum"
            className="mx-auto mb-2"
          />
          <span className="text-lg font-bold">MAISON DU PARFUM</span>
        </div>

        {/* Nút User và Shopping */}
        <div className="flex items-center mr-[10%] space-x-4">
          <button className="text-white text-xl transition-transform transform hover:scale-125">
            <CiUser className="w-6 h-6" />
          </button>
          <button className="text-white text-xl transition-transform transform hover:scale-125">
            <CiShoppingBasket className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Thanh điều hướng */}
      <nav className="mt-4">
        <ul className="flex justify-center space-x-8">
          <li className="hover:underline cursor-pointer">Merry Christmas</li>
          <li className="hover:underline cursor-pointer">Nước hoa nam</li>
          <li className="hover:underline cursor-pointer">Nước hoa nữ</li>
          <li className="hover:underline cursor-pointer">Nước hoa unisex</li>
          <li className="hover:underline cursor-pointer">All product</li>
          <li className="hover:underline cursor-pointer">Về Maison</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;