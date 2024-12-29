import React from "react";
import ProductCard from "../../../components/ProductCard/ProductCard";

const products = [
  {
    id: 1,
    name: "L'Ombre EDP",
    price: "590.000 VND",
    oldPrice: "650.000 VND",
    images: [
      "https://maisonduparfumstore.com/cdn/shop/files/ParfumsDeMarlyDelinaEDP.jpg?v=1728036691&width=600",
      "https://maisonduparfumstore.com/cdn/shop/files/1_2.jpg?v=1734978371&width=600",
      "https://via.placeholder.com/200x300"
    ],
    description: "L'Ombre EDP là một dòng nước hoa sang trọng, mang đến sự quyến rũ."
  },
  {
    id: 2,
    name: "Ilio EDT",
    price: "440.000 VND",
    oldPrice: "590.000 VND",
    images: [
      "https://via.placeholder.com/200x300",
      "https://via.placeholder.com/200x300"
    ],
    description: "Ilio EDT mang đến hương thơm tươi mát, thích hợp cho mùa hè."
  },
  {
    id: 3,
    name: "Eau Capital EDP",
    price: "590.000 VND",
    oldPrice: "650.000 VND",
    images: [
      "https://via.placeholder.com/200x300"
    ],
    description: "Eau Capital EDP mang đến một hương thơm thanh lịch, phù hợp với môi trường công sở."
  },
  {
    id: 4,
    name: "Fleur De Peau EDP",
    price: "590.000 VND",
    oldPrice: "650.000 VND",
    images: [
      "https://via.placeholder.com/200x300"
    ],
    description: "Fleur De Peau EDP có hương hoa nhẹ nhàng, dễ chịu, thích hợp cho các buổi hẹn hò."
  },
  {
    id: 5,
    name: "Orpheon EDP",
    price: "590.000 VND",
    oldPrice: "650.000 VND",
    images: [
      "https://via.placeholder.com/200x300"
    ],
    description: "Orpheon EDP mang đến một trải nghiệm hương thơm sâu sắc, quyến rũ."
  },
  {
    id: 6,
    name: "Pradadoxe",
    price: "400.000 VND",
    oldPrice: "340.000 VND",
    images: [
      "https://via.placeholder.com/200x300"
    ],
    description: "Pradadoxe mang đến một hương thơm tinh tế và đầy lôi cuốn."
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
