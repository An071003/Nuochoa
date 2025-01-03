import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  return (
    <div
      className="bg-white border-1 border-spacing-80 shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition duration-300"
      onClick={handleClick}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover border rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="flex text-lg font-bold justify-center">{product.name}</h3>
        <div className="flex items-center space-x-2 mt-2 justify-center">
          <span className="text-red-600 font-bold">{product.price} VND</span>
        </div>
        {product.oldPrice && (
          <span className="text-gray-500 line-through">{product.oldPrice} VND</span>
        )}
        {product.oldPrice && (
          <div className="absolute top-52 left-2 text-white bg-red-600 p-2 rounded-md">
            Giảm giá
          </div>
        )}
      </div>
    </div>
  );
}
