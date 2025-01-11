import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (product.countInStock > 0) {
      navigate(`/product/${product._id}`, { state: { product } });
    }
  };

  return (
    <div
      className={`relative bg-white border-1 border-spacing-80 shadow-lg rounded-lg overflow-hidden ${
        product.countInStock > 0 ? "hover:scale-105 cursor-pointer" : "opacity-70"
      } transform transition duration-300`}
      onClick={product.countInStock > 0 ? handleClick : undefined}
    >
      <div
        key={product._id}
        className="border rounded-lg flex flex-col items-center justify-center p-4 gap-y-3"
      >
        {/* Hình ảnh sản phẩm */}
        <div className="relative">
        <img
          src={product.thumbnail || "path/to/placeholder-image.jpg"}
          alt={product.name}
          className="w-44 h-48 object-cover mt-4"
        />
          {/* Hiển thị "Tạm hết hàng" nếu sản phẩm hết hàng */}
          {!(product.countInStock > 0) && (
            <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
              <div className="text-red-500 text- font-bold border-4 border-red-500 p-2 rounded-md transform rotate-[-10deg]">
                TẠM HẾT HÀNG
              </div>
            </div>
          )}
        </div>

        {/* Tên và giá sản phẩm */}
        <h2 className="text-center text-lg font-bold">{product.name}</h2>
        <p className="text-center text-red-500 font-bold">
          {product.price.toLocaleString("vi-VN")} VND
        </p>
      </div>
    </div>
  );
}
