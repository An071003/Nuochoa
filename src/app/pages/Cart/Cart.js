import React, { useEffect, useState } from "react";
import cartStore from "../stores/cartStore";

export default function Cart() {
  const [cart, setCart] = useState(cartStore._value.state.cart);  // Initialize state with cartStore's state

  useEffect(() => {
    const unsubscribe = cartStore._value.subscribe(() => {
      setCart(cartStore._value.state.cart); // Update the cart state when cartStore changes
    });

    return () => {
      unsubscribe(); // Cleanup the subscription when the component unmounts
    };
  }, []);

  const handleRemoveFromCart = (productId, size) => {
    cartStore._value.actions.removeFromCart(productId, size);
  };

  const handleClearCart = () => {
    cartStore._value.actions.clearCart();
  };

  return (
    <div className="container mx-auto py-10 min-h-[500px]">
      <h1 className="text-2xl font-bold mb-6">Giỏ hàng</h1>
      {cart.length === 0 ? (
        <p>Chưa có sản phẩm nào trong giỏ hàng của bạn.</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>Kích thước: {item.size}</p>
                  <p>Số lượng: {item.quantity}</p>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item.id, item.size)}
                  className="text-red-500 hover:underline"
                >
                  Xóa
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleClearCart}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Xóa toàn bộ giỏ hàng
          </button>
        </>
      )}
    </div>
  );
}
