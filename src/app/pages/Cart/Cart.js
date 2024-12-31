import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      name: "Triump Bdsafs",
      price: 5200000,
      quantity: 1,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      name: "Triumpdsas",
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

  const navigate = useNavigate();

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

  // Tính tổng tiền
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container max-w-[960px] mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Giỏ hàng của bạn</h1>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-gray-500">Giỏ hàng của bạn đang trống!</p>
          <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => navigate("/shop")}
          >
            Tiếp tục mua sắm
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="text-left border-b">
                <th className="p-3">Sản phẩm</th>
                <th className="p-3">Giá</th>
                <th className="p-3">Số lượng</th>
                <th className="p-3">Tổng</th>
                <th className="p-3">Xoá</th>
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
          <div className="mt-6 text-right">
            <p className="text-lg font-bold mb-2">
              Tổng cộng: {total.toLocaleString()}₫
            </p>
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              onClick={() => navigate("/checkout", { state: { cartItems } })}
            >
              Thanh toán
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
