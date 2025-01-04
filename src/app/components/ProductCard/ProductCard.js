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
      <div key={product._id} className="border rounded-lg shadow p-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover mb-4"
        />
        <h2 className="text-center text-lg font-bold">{product.name}</h2>
        <p className="text-center text-red-500 font-bold">{product.price.toLocaleString("vi-VN")} VND</p>
      </div>
    </div>
  );
}
