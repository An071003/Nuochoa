import React from "react";
import { useLocation } from "react-router-dom";

export default function ProductDetail() {
  const { state } = useLocation(); // Lấy dữ liệu từ state
  const product = state?.product;

  if (!product) {
    return <p>Không tìm thấy sản phẩm này</p>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row">
        <img src={product.image} alt={product.name} className="w-full md:w-1/2" />
        <div className="md:w-1/2 p-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-xl text-red-600">{product.price}</p>
          <p className="mt-4">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
