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
  const isLoggedIn = true; // Replace this with actual login status from context or state management

  // Navigate to User Profile or Login page
  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate("/user");
    } else {
      navigate("/login");
    }
  };

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      await logoutAcc();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  // Handle search input
  const handleSearch = async (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);

    if (keyword.length >= 1) {
      try {
        const response = await fetch(`${API_URL}/api/products/search?keyword=${keyword}`);
        if (!response.ok) throw new Error("Search error");
        const data = await response.json();
        setSuggestions(data.products);
      } catch (error) {
        console.error("Search failed:", error.message);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Handle form submit for search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate("/search-results", { state: { products: suggestions } });
      setSearchKeyword("");
      setSuggestions([]);
    } else {
      setError("Please enter a search term.");
    }
  };

  // Handle clicking on a search suggestion
  const handleSuggestionClick = (productId) => {
    setSearchKeyword("");
    setSuggestions([]);
    navigate(`/product/${productId}`);
  };

  // Reusable button component for profile/logout actions
  const renderMenuItem = (onClick, label, additionalClass = "") => (
    <button
      onClick={onClick}
      className={`block w-full text-left px-4 py-2 ${additionalClass} text-gray-700 hover:bg-sky-400 hover:rounded-lg`}
    >
      {label}
    </button>
  );

  // Menu items for dropdown
  const menuItems = [
    {
      key: "1",
      label: renderMenuItem(handleUserClick, "User Profile"),
    },
    {
      key: "2",
      label: renderMenuItem(handleLogout, "Logout", "text-white bg-rose-500 rounded-lg hover:bg-rose-600"),
    },
  ];

  return (
    <header className="bg-[#FFF6E3] text-[#283149] sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-4 py-2">
        {/* Logo */}
        <Link to="/" target="_top" className="flex items-center">
          <img src={Logo} alt="Logo" className="max-h-[100px] object-contain w-[120px] sm:w-[150px] md:w-[200px]" />
        </Link>

        {/* Search Bar */}
        <div className="w-full sm:w-[400px] lg:w-[500px]">
          <SearchBar
            searchKeyword={searchKeyword}
            handleSearch={handleSearch}
            handleSearchSubmit={handleSearchSubmit}
            error={error}
          />
        </div>

        {/* User Profile and Cart */}
        <div className="flex gap-4 mt-4 sm:mt-0 flex-wrap items-center">
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
