import React, { useState, useEffect } from "react";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { API_URL } from "../../../../config/webpack.config";

export default function ProductList() {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products/featured`);

        if (!response.ok) {
          throw new Error("Failed to fetch featured products");
        }
        const data = await response.json();

        // Kiểm tra xem data có phải là mảng không
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received");
        }

        // Sắp xếp sản phẩm theo countInStock giảm dần
        const sortedProducts = data.sort((a, b) => b.countInStock - a.countInStock);
        setProducts(sortedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-500">Đang tải sản phẩm nổi bật...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <p className="text-2xl font-semibold text-center text-slate-500 my-8">
        Merry Christmas Xmas | Giảm 8% mọi đơn đặt hàng trên website
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}