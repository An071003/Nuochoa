import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get the category parameter from the URL
import { API_URL } from "../../../config/webpack.config";
import ProductCard from "../../components/ProductCard/ProductCard";

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("newest");
  const [filterOption, setFilterOption] = useState("all");

  // Fetch products by category from the API
  const fetchProductsByCategory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/products/category/${category}`);
      if (!response.ok) {
        throw new Error("Lỗi khi lấy danh sách sản phẩm. Vui lòng thử lại.");
      }

      const data = await response.json();
      setProducts(data.products);
      setFilteredProducts(data.products); // Initially, filteredProducts = all products
    } catch (err) {
      setError(err.message); // Handle error
    } finally {
      setLoading(false);
    }
  };

  // Apply Sorting
  const sortProducts = (option) => {
    let sortedProducts = [...filteredProducts];
    if (option === "newest") {
      sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (option === "priceLowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === "priceHighToLow") {
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
      // Assuming there's an `inStock` property in the product data
      setFilteredProducts(products.filter((product) => product.countInStock));
    }
  };

  // Run fetchProductsByCategory whenever the category changes
  useEffect(() => {
    fetchProductsByCategory();
  }, [category]);

  // Reapply sorting and filtering when the respective options change
  useEffect(() => {
    sortProducts(sortOption);
  }, [sortOption]);

  useEffect(() => {
    filterProducts(filterOption);
  }, [filterOption]);

  return (
    <div className="container min-h-[400px] max-w-[960px] mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6 capitalize">{category}</h1>

      {loading ? (
        <div className="text-center">Đang tải...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          {/* Filter and Sort Options */}
          <div className="flex justify-around items-center mb-6">
            <div>
              <span className="font-medium">Bộ lọc: </span>
              <select
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="all">Tất cả</option>
                <option value="featured">Sản phẩm nổi bật</option>
                <option value="inStock">Còn hàng</option>
              </select>
            </div>

            <div>
              <span className="font-medium">Sắp xếp theo: </span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="newest">Ngày (từ mới đến cũ)</option>
                <option value="priceLowToHigh">Giá (tăng dần)</option>
                <option value="priceHighToLow">Giá (giảm dần)</option>
              </select>
            </div>

            <div>
              <span className="font-medium">{filteredProducts.length} sản phẩm</span>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center text-[#283149] mt-16 text-4xl">Không có sản phẩm</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryPage;
