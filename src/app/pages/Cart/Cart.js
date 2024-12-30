import React, { useState } from "react";
import CartItem from "../../components/CartItem/CartItem";

export default function Cart() {
  // Dữ liệu sản phẩm mẫu
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Triump Bacchus",
      price: 5200000,
      quantity: 1,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Triump Bacchus",
      price: 5200000,
      quantity: 1,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      name: "Triump Bacchus",
      price: 5200000,
      quantity: 1,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 4,
      name: "Triump Bacchus",
      price: 5200000,
      quantity: 1,
      image: "https://via.placeholder.com/50",
    },
  ]);

  // Hàm xử lý tăng số lượng
  const handleIncrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Hàm xử lý giảm số lượng
  const handleDecrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Hàm xử lý xóa sản phẩm
  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Tính tổng
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container max-w-[1210px] mx-44 py-8">
      <h1 className="text-2xl font-bold mb-4">Giỏ hàng của bạn</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="text-left border-b">
              <th className="p-3">Sản phẩm</th>
              <th className="p-3">Giá</th>
              <th className="p-3">Số lượng</th>
              <th className="p-3">Tổng</th>
              <th className="p-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((product) => (
              <CartItem
                key={product.id}
                product={product}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemove}
              />
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-right">
          <p className="text-lg font-bold">Tổng cộng: {total.toLocaleString()}₫</p>
          <button className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-md">
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}
