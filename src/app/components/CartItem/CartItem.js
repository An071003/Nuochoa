import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import ConfirmPopup from "../../components/confirmpopup"; // Đảm bảo đường dẫn đúng

export default function CartItem({ product, onIncrease, onDecrease, onRemove, onUpdateQuantity }) {
  const [showPopup, setShowPopup] = useState(false);
  const handleConfirmDelete = (confirm) => {
    if (confirm) {
      onRemove(product._idCartItem);
    }
    setShowPopup(false);
  };

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return; // Không giảm số lượng xuống dưới 1
    try {
      // Gọi hàm cập nhật số lượng và truyền id cùng với số lượng mới
      onUpdateQuantity(product._idCartItem, newQuantity);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <>
      <tr className="border-b">
        <td className="p-2 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap flex items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-12 h-12 mr-4"
          />
          <div className="relative group">
            <span
              className="block w-full overflow-hidden text-ellipsis whitespace-nowrap"
              title={product.name}
            >
              {product.name}
            </span>
            <div className="absolute left-0 bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 shadow-lg z-10">
              {product.name}
            </div>
          </div>
        </td>
        <td className="p-3">
          {product.price ? product.price.toLocaleString() : '0₫'}
        </td>
        <td className="p-3 w-[100px]">
          <div className="flex items-center">
            <button
              className="px-2 py-1 border"
              onClick={() => handleQuantityChange(product.quantity - 1)} // Giảm số lượng
            >
              -
            </button>
            <span className="px-3 min-w-[50px] text-center">{product.quantity}</span>
            <button
              className="px-2 py-1 border"
              onClick={() => handleQuantityChange(product.quantity + 1)} // Tăng số lượng
            >
              +
            </button>
          </div>
        </td>
        <td className="p-3 max-w-20 min-w-[80px] text-center">
          {product.price ? (product.price * product.quantity).toLocaleString() : '0₫'}
        </td>
        <td className="p-3">
          <button
            className="text-red-500 hover:underline"
            onClick={() => setShowPopup(true)}
          >
            <MdDelete className="text-[25px] text-[#283149] hover:scale-125" />
          </button>
        </td>
      </tr>
      {showPopup && (
        <ConfirmPopup onConfirm={handleConfirmDelete} />
      )}
    </>
  );
}
