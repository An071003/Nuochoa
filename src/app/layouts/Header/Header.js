import React from "react";

function Header() {
  return (
    <header className="bg-[#4c0e0e] text-white py-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <button className="text-white text-xl">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="text-center">
          <img
            src="https://via.placeholder.com/100x50"
            alt="Maison Du Parfum"
            className="mx-auto mb-2"
          />
          <span className="text-lg font-bold">MAISON DU PARFUM</span>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-white text-xl">
            <i className="fas fa-user"></i>
          </button>
          <div className="relative">
            <button className="text-white text-xl">
              <i className="fas fa-shopping-bag"></i>
            </button>
          </div>
        </div>
      </div>

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