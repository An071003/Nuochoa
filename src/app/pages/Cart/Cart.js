import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../../components/CartItem/CartItem";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Không thể tải giỏ hàng.");
        }

        const data = await response.json();
        setCartItems(data);
      } catch (err) {
        setError(err.message);
        message.error("Có lỗi xảy ra khi tải giỏ hàng.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [navigate]);

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

  if (loading) {
    return <div>Đang tải giỏ hàng...</div>;
  }

  if (error) {
    return <div>Đã xảy ra lỗi: {error}</div>;
  }

  return (
    <div className="container min-h-[400px] max-w-[960px] mx-auto py-8">
      {cartItems.length === 0 ? (
        <div>
          <h1 className="text-2xl font-bold mb-6 text-center">Giỏ hàng của bạn</h1>
          <div className="text-center">
            <p className="text-lg text-gray-500">Giỏ hàng của bạn đang trống!</p>
            <button
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => navigate("/")}
            >
              Tiếp tục mua sắm
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-sans font-bold mb-6 text-left">Giỏ hàng của bạn</h1>
          <div className="bg-white shadow-md rounded-lg p-6">
            <table className="w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="text-left border-b">
                  <th className="p-3">Sản phẩm</th>
                  <th className="p-3">Giá</th>
                  <th className="p-3">Số lượng</th>
                  <th className="p-3 text-center">Tổng</th>
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
              <p className="text-lg font-sans font-bold mb-2">
                Tổng cộng: {total.toLocaleString()}₫
              </p>
              <button
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                onClick={() => navigate("/checkout/info", { state: { cartItems } })}
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
