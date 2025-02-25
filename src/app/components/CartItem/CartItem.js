import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import ConfirmPopup from "../../components/confirmpopup"; 

export default function CartItem({ product, onRemove, onUpdateQuantity }) {
  const [showPopup, setShowPopup] = useState(false);
  
  // Hàm xác nhận xóa sản phẩm
  const handleConfirmDelete = (confirm) => {
    if (confirm) {
      onRemove(product._idCartItem);
    }
    setShowPopup(false);
  };

  // Cập nhật số lượng sản phẩm
  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    try {
      onUpdateQuantity(product._idCartItem, newQuantity);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <>
      <tr className="border-b">
        <td className="p-2 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap flex items-center">
          {/* Hình ảnh sản phẩm sử dụng thumbnail */}
          <img
            src={product.thumbnail}
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
              onClick={() => handleQuantityChange(product.quantity - 1)}
            >
              -
            </button>
            <span className="px-3 min-w-[50px] text-center">{product.quantity}</span>
            <button
              className="px-2 py-1 border"
              onClick={() => handleQuantityChange(product.quantity + 1)}
            >
              +
            </button>
          </div>
        </td>
        <td className="p-3 max-w-20 min-w-[80px] text-center">
          {product.price ? (product.price * product.quantity).toLocaleString() + '₫' : '0₫'}
        </td>
        <td className="p-3">
          <button
            className="text-red-500 hover:underline"
            onClick={() => setShowPopup(true)}
          >
            <MdDelete className="ml-1 text-[25px] text-[#283149] hover:scale-125" />
          </button>
        </td>
      </tr>
      {showPopup && (
        <ConfirmPopup onConfirm={handleConfirmDelete} />
      )}
    </>
  );
}
