import React from "react";
import { useLocation } from "react-router-dom";

export default function Checkout() {
  const location = useLocation();
  const cartItems = location.state?.cartItems || []; // Dữ liệu giỏ hàng

  // Tính tổng tiền
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-8 flex flex-col lg:flex-row lg:space-x-4">
      {/* Phần bên trái */}
      <div className="w-full lg:w-2/3 bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Thông tin thanh toán</h1>
        <div className="mb-4">
          <h2 className="text-lg font-bold">Liên hệ</h2>
          <input
            type="email"
            className="w-full border p-2 mt-2"
            placeholder="Email hoặc số điện thoại di động"
          />
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-bold">Địa chỉ giao hàng</h2>
          <input
            type="text"
            className="w-full border p-2 mt-2"
            placeholder="Tên"
          />
          <input
            type="text"
            className="w-full border p-2 mt-2"
            placeholder="Họ"
          />
          <input
            type="text"
            className="w-full border p-2 mt-2"
            placeholder="Địa chỉ"
          />
          <input
            type="text"
            className="w-full border p-2 mt-2"
            placeholder="Thành phố"
          />
          <input
            type="text"
            className="w-full border p-2 mt-2"
            placeholder="Số điện thoại"
          />
        </div>
        <div className="mt-4 text-right">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-md">
            Hoàn tất thanh toán
          </button>
        </div>
      </div>

      {/* Phần bên phải */}
      <div className="w-full lg:w-1/3 bg-gray-100 shadow-md rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Sản phẩm trong giỏ hàng</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-md mr-4"
                />
                <div>
                  <p className="text-sm font-bold">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} x {item.price.toLocaleString()}₫
                  </p>
                </div>
              </div>
              <p className="text-sm font-bold">
                {(item.price * item.quantity).toLocaleString()}₫
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <p className="text-lg font-bold">Tổng cộng: {total.toLocaleString()}₫</p>
        </div>
      </div>
    </div>
  );
}
