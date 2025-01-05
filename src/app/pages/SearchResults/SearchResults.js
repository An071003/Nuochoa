import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

export default function SearchResults() {
  const location = useLocation();
  const { products: initialProducts } = location.state || { products: [] };
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [sortOption, setSortOption] = useState("relevance");
  const [filterOption, setFilterOption] = useState("all");

  // Apply Sorting
  const sortProducts = (option) => {
    let sortedProducts = [...filteredProducts];
    if (option === "relevance") {
      // Keep the default sorting order
      sortedProducts = [...filteredProducts];
    } else if (option === "newest") {
      sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (option === "price-low") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === "price-high") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sortedProducts);
  };

  // Apply Filtering
  const filterProducts = (option) => {
    if (option === "all") {
      setFilteredProducts(products);
    } else if (option === "featured") {
      setFilteredProducts(products.filter((product) => product.isFeatured));
    } else if (option === "inStock") {
      setFilteredProducts(products.filter((product) => product.countInStock > 0));
    }
  };

  // Reapply sorting and filtering when the respective options change
  useEffect(() => {
    sortProducts(sortOption);
  }, [sortOption]);

  useEffect(() => {
    filterProducts(filterOption);
  }, [filterOption]);

  return (
    <div className="container min-h-[400px] max-w-[960px] mx-auto py-10">
      {/* Header phần tìm kiếm */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-center">Kết quả tìm kiếm</h1>
        <p className="text-gray-500 text-center">
          Đã tìm thấy <span className="font-semibold">{filteredProducts.length}</span> sản phẩm phù hợp với từ khóa của bạn
        </p>
      </div>

      {/* Bộ lọc và sắp xếp - Luôn hiển thị */}
      <div className="flex justify-between items-center mb-6">
        {/* Bộ lọc */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 text-sm">Bộ lọc:</span>
          <select
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="all">Tất cả</option>
            <option value="featured">Sản phẩm nổi bật</option>
            <option value="inStock">Còn hàng</option>
          </select>
        </div>

        {/* Sắp xếp */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 text-sm">Sắp xếp theo:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="relevance">Mức độ liên quan</option>
            <option value="newest">Mới nhất</option>
            <option value="price-low">Giá thấp đến cao</option>
            <option value="price-high">Giá cao đến thấp</option>
          </select>
        </div>
      </div>

      {/* Nếu không có sản phẩm */}
      {filteredProducts.length === 0 ? (
        <p className="text-lg text-gray-600 text-center mt-10">
          Không tìm thấy sản phẩm nào.
        </p>
      ) : (
        <div>
          {/* Danh sách sản phẩm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200"
              >
                <Link to={`/product/${product._id}`}>
                  {/* Hình ảnh sản phẩm */}
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-56 object-cover"
                    />
                    {product.discount && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        Giảm {product.discount}%
                      </span>
                    )}
                  </div>
                  {/* Thông tin sản phẩm */}
                  <div className="p-4">
                    <h2 className="text-lg font-semibold truncate">{product.name}</h2>
                    <p className="text-sm text-gray-500">{product.brand}</p>
                    <div className="mt-2">
                      <span className="text-xl font-bold text-red-500">
                        {product.price.toLocaleString()}₫
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          {product.originalPrice.toLocaleString()}₫
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
