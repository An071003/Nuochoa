import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../../components/CartItem/CartItem";
import {API_URL} from "../../../config/webpack.config"
export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`${API_URL}/api/cart`, {
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
        localStorage.setItem("cartItems", JSON.stringify(data));
      } catch (err) {
        setError(err.message);
        message.error("Có lỗi xảy ra khi tải giỏ hàng.");
      }

    };

    fetchCartItems();
  }, [cartItems]);

  const handleUpdateQuantity = async (id, newQuantity) => {
    try {
      const response = await fetch(`http://localhost:5001/api/cart/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          quantity: newQuantity
        }),
      });

      if (!response.ok) {
        throw new Error("Không thể cập nhật số lượng.");
      }

      const updatedCart = await response.json();
      setCartItems(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    } catch (error) {
      console.error("Error updating quantity:", error);
      message.error("Có lỗi xảy ra khi cập nhật số lượng.");
    }
  };

  const handleRemove = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/cart/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
      });

      if (!response.ok) {
        throw new Error("Không thể xóa sản phẩm");
      }

      const updatedCart = await response.json();
      setCartItems(updatedCart);
      console.log(updatedCart)
    } catch (err) {
      message.error("Có lỗi xảy ra khi xóa sản phẩm.");
    }
  };

  // Tính tổng tiền
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (error) {
    return <div>Đã xảy ra lỗi: {error}</div>;
  }

  return (
    <div className="container min-h-[400px] max-w-[960px] mx-auto py-8">
      {cartItems.length === 0 ? (
        <div>
          <h1 className="text-2xl font-bold mb-6 text-center">Giỏ hàng của bạn</h1>
          <div className="text-center">
            <p className="text-lg text-[#283149]">Giỏ hàng của bạn đang trống!</p>
            <button
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => navigate("/")}>
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
                <tr className="border-b">
                  <th className="p-3 text-left">Sản phẩm</th>
                  <th className="p-3 text-left">Giá</th>
                  <th className="p-3 text-center">Số lượng</th>
                  <th className="p-3 text-center">Tổng</th>
                  <th className="p-3 text-left">Xoá</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((product) => (
                  <CartItem
                    key={`${product.id}-${product.name}`}
                    product={product}
                    onRemove={handleRemove}
                    onUpdateQuantity={handleUpdateQuantity}
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
                onClick={() => navigate("/checkout/info", { state: { cartItems } })}>
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
