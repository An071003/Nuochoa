import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Chuyển hướng và truyền dữ liệu sản phẩm vào state
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transform transition duration-300" onClick={handleClick}>
      {/* Hình ảnh sản phẩm */}
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        {/* Tên sản phẩm */}
        <h3 className="flex text-lg font-bold justify-center">{product.name}</h3>
        {/* Giá sản phẩm */}
        <div className="flex items-center space-x-2 mt-2 justify-center">
          <span className="text-red-600 font-bold">{product.price}</span>
          <span className="text-gray-500 line-through">{product.oldPrice}</span>
        </div>
        <div className="absolute top-52 text-white bg-red-600 p-2"> Giảm giá</div>
      </div>
    </div>
  );
}
