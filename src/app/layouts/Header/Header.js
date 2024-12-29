import React, { useState } from "react";
import { CiUser, CiShoppingBasket, CiSearch } from "react-icons/ci";

function Header() {
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearchClick = () => {
    setIsSearchActive(!isSearchActive);
  };

  const closeSearch = () => {
    setIsSearchActive(false);
  };

  return (
    <>
      {/* Overlay làm mờ khi thanh tìm kiếm kích hoạt */}
      {isSearchActive && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
          onClick={closeSearch} // Đóng tìm kiếm khi nhấn vào overlay
        ></div>
      )}

      <header className="bg-[#4c0e0e] text-white py-4 sticky top-0 z-50">
        <div
          className={`relative transition-all duration-300 ${
            isSearchActive ? "h-[80px]" : "h-auto"
          }`}
        >
          {/* Khi Search chưa được kích hoạt */}
          {!isSearchActive && (
            <div className="container mx-auto flex justify-between items-center">
              {/* Nút Search */}
              <div className="flex items-center ml-[10%]">
                <button
                  className="text-white text-xl transition-transform transform hover:scale-125"
                  onClick={handleSearchClick}
                >
                  <CiSearch />
                </button>
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
          )}

          {/* Khi Search được kích hoạt */}
          {isSearchActive && (
            <div className="absolute inset-0 bg-[#4c0e0e] flex items-center justify-center z-50">
              <div className="relative w-[90%] max-w-[600px]">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full px-4 py-3 bg-transparent text-white border border-white rounded-full focus:outline-none placeholder-white text-lg"
                />
                <button
                  className="absolute top-0 right-0 mt-[10px] mr-[10px] text-white text-xl"
                  onClick={closeSearch}
                >
                  X
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Thanh điều hướng */}
        {!isSearchActive && (
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
        )}
      </header>
    </>
  );
}

export default Header;
