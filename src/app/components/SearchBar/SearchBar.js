import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaSpinner } from "react-icons/fa"; // Thêm biểu tượng spinner
import { API_URL } from "../../../config/webpack.config";

function SearchBar() {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Thêm state loading
    const navigate = useNavigate();

    // Xử lý khi người dùng nhập từ khóa
    const handleSearch = async (e) => {
        const keyword = e.target.value;
        setSearchKeyword(keyword);
        setError("");
        setIsLoading(true); // Bắt đầu loading

        if (keyword.length >= 1) {
            try {
                const response = await fetch(`${API_URL}/api/products/search?keyword=${keyword}`);
                if (!response.ok) throw new Error("Lỗi tìm kiếm sản phẩm");
                const data = await response.json();

                // Sắp xếp sản phẩm: trước tiên là sản phẩm còn hàng
                const sortedProducts = data.products.sort((a, b) => {
                    const aInStock = a.countInStock > 0 ? 1 : 0;
                    const bInStock = b.countInStock > 0 ? 1 : 0;
                    // Sắp xếp giảm dần: sản phẩm còn hàng trước
                    return bInStock - aInStock;
                });
                setSuggestions(sortedProducts);
            } catch (error) {
                console.error("Lỗi tìm kiếm:", error.message);
                setSuggestions([]);
                setError("Đã xảy ra lỗi khi tìm kiếm sản phẩm.");
            }
        } else {
            setSuggestions([]);
        }
        setIsLoading(false); // Kết thúc loading
    };

    // Xử lý khi người dùng nhấn Enter hoặc nhấn nút tìm kiếm
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
    const handleSuggestionClick = (productId, countInStock) => {
        if (countInStock > 0) {
            setSearchKeyword("");
            setSuggestions([]);
            navigate(`/product/${productId}`);
        }
    };

    return (
        <form className="relative w-[600px]" onSubmit={handleSearchSubmit}>
            {/* Search Input và Nút Tìm Kiếm */}
            <div className="flex justify-between items-center bg-white rounded-full px-3 py-1 border border-[#283149]">
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
                    disabled={isLoading} // Vô hiệu hóa nút khi đang tải
                >
                    {isLoading ? <FaSpinner className="animate-spin" /> : <CiSearch />}
                </button>
            </div>

            {/* Danh sách gợi ý */}
            {searchKeyword.length >= 1 && (
                <div className="absolute bg-white border border-gray-300 rounded-md w-full mt-1 max-h-60 overflow-y-auto shadow-lg z-10 transition-all duration-300 ease-in-out">
                    {isLoading ? (
                        // Hiển thị Loader khi đang tải
                        <div className="p-2 text-center text-gray-500 flex items-center justify-center">
                            <FaSpinner className="animate-spin mr-2" /> Đang tải...
                        </div>
                    ) : suggestions.length > 0 ? (
                        <ul>
                            {suggestions.map((product) => (
                                <li
                                    key={product._id}
                                    className={`flex items-center p-2 cursor-pointer hover:bg-gray-100 ${!(product.countInStock > 0) ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                    onClick={() =>
                                        product.countInStock > 0 && handleSuggestionClick(product._id, product.countInStock)
                                    }
                                >
                                    {/* Container ảnh sản phẩm */}
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-12 h-12 object-cover rounded-md mr-3"
                                        onError={(e) => { e.target.src = "/path/to/default-image.jpg"; }}
                                    />

                                    {/* Thông tin sản phẩm */}
                                    <div className="flex flex-col flex-grow">
                                        <div className="">
                                            <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
                                            <p className="text-xs text-gray-500">{product.brand}</p>
                                            <p className="text-sm font-semibold text-red-500">
                                                {product.price.toLocaleString()}₫
                                            </p>
                                        </div>
                                    </div>

                                    {/* Chữ "Hết hàng" bên phải box */}
                                    {!(product.countInStock > 0) && (
                                        <span className="text-xs text-red-500 font-bold ml-2">
                                            Hết hàng
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="p-2 text-center text-gray-500">Không tìm thấy sản phẩm nào.</p>
                    )}
                </div>
            )}

            {/* Danh mục phổ biến (ẩn khi có gợi ý hoặc lỗi) */}
            {(!searchKeyword || suggestions.length === 0) && !error && (
                <div className="absolute bottom-[-30px] left-0 w-full flex justify-center space-x-4 pt-2 text-sm">
                    <Link to="/category/Nước hoa nam" className="hover:underline cursor-pointer">
                        Nước hoa nam
                    </Link>
                    <Link to="/category/Nước hoa nữ" className="hover:underline cursor-pointer">
                        Nước hoa nữ
                    </Link>
                    <Link to="/category/Nước hoa unisex" className="hover:underline cursor-pointer">
                        Nước hoa unisex
                    </Link>
                </div>
            )}

            {/* Hiển thị thông báo lỗi nếu có */}
            {error && (
                <div className="absolute top-0 left-0 right-0 bg-red-500 text-white py-2 text-center">
                    {error}
                </div>
            )}
        </form>
    );

}

export default SearchBar;
