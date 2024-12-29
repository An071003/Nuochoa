import React from "react";
import ProductCard from "../../../components/ProductCard/ProductCard";

const products = [
  {
    id: 1,
    name: "L'Ombre EDP",
    price: "590.000 VND",
    oldPrice: "650.000 VND",
    image: "https://via.placeholder.com/200x300",
  },
  {
    id: 2,
    name: "Ilio EDT",
    price: "440.000 VND",
    oldPrice: "590.000 VND",
    image: "https://via.placeholder.com/200x300",
  },
  {
    id: 3,
    name: "Eau Capital EDP",
    price: "590.000 VND",
    oldPrice: "650.000 VND",
    image: "https://via.placeholder.com/200x300",
  },
  {
    id: 4,
    name: "Fleur De Peau EDP",
    price: "590.000 VND",
    oldPrice: "650.000 VND",
    image: "https://via.placeholder.com/200x300",
  },
  {
    id: 5,
    name: "Orpheon EDP",
    price: "590.000 VND",
    oldPrice: "650.000 VND",
    image: "https://via.placeholder.com/200x300",
  },
  {
    id: 6,
    name: "Pradadoxe",
    price: "400.000 VND",
    oldPrice: "340.000 VND",
    image: "https://via.placeholder.com/200x300",
  },
];

export default function ProductList() {
  return (
    <div className="container mx-auto px-4">
      <p className="text-2xl font-semibold text-center text-slate-500 my-8">Merry Christmas Xmas | Giảm 8% mọi đơn đặt hàng trên website</p>
      <p className="text-xl font-semibold text-center my-8">mới được updated</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
