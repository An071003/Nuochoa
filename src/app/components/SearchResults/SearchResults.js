import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function SearchResults() {
  const location = useLocation();
  const { products } = location.state || { products: [] };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Kết quả tìm kiếm</h1>
      {products.length === 0 ? (
        <p className="text-lg text-gray-600">Không tìm thấy sản phẩm nào.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200"
            >
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded"
                />
                <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-600">{product.brand}</p>
                <p className="text-xl font-bold text-red-500">
                  {product.price.toLocaleString()}₫
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
