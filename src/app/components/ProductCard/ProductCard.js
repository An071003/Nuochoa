import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transform transition duration-300">
      {/* Hình ảnh sản phẩm */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        {/* Tên sản phẩm */}
        <h3 className="text-lg font-bold">{product.name}</h3>
        {/* Giá sản phẩm */}
        <div className="flex items-center space-x-2 mt-2">
          <span className="text-red-600 font-bold">{product.price}</span>
          <span className="text-gray-500 line-through">{product.oldPrice}</span>
        </div>
        {/* Nút mua */}
        <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}
