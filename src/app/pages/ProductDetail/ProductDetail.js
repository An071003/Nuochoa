import { message, notification } from "antd";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function ProductDetail() {
  const { state } = useLocation(); // Lấy dữ liệu từ state
  const product = state?.product;

  // Nếu không có sản phẩm, hiển thị thông báo
  if (!product) {
    return <p>Không tìm thấy sản phẩm này</p>;
  }

  // State để lưu hình ảnh được chọn
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  // State để quản lý số lượng
  const [quantity, setQuantity] = useState(1);

  // State để lưu kích thước đã chọn
  const [selectedSize, setSelectedSize] = useState("Full 100ml");

  // Hàm thay đổi hình ảnh khi người dùng click vào thumbnail
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Hàm tăng số lượng
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Hàm giảm số lượng
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = () => {
    // Logic để thêm vào giỏ hàng, có thể là cập nhật vào một global state hoặc gửi API
    message.success(`Đã thêm ${quantity} sản phẩm ${product.name} (${selectedSize}) vào giỏ hàng!`);
  };

  // Hàm thay đổi kích thước
  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="container mx-36 my-10 px-4 w-[70%] min-h-[600px]">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <img
            src={selectedImage}
            alt={product.name}
            className="w-[300px] h-[500px] object-cover"
          />
          <div className="flex space-x-4 mt-4">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} thumbnail ${index + 1}`}
                className="w-24 h-24 object-cover cursor-pointer border-2 border-transparent hover:border-gray-300"
                onClick={() => handleImageClick(image)} 
              />
            ))}
          </div>
        </div>

        <div className="md:w-1/2 p-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-xl text-red-600">{product.price}</p>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Chọn kích thước:</h3>
            <div className="flex space-x-4 mt-2">
              {["Full 100ml", "Chiết 10ml", "Chiết 5ml"].map((size) => (
                <div
                  key={size}
                  className={`cursor-pointer px-4 py-2 border rounded-md text-center ${selectedSize === size ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                  onClick={() => handleSizeChange(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Số lượng:</h3>
            <div className="flex items-center mt-4 border-2 border-black w-fit rounded-md">
              <button
                onClick={decreaseQuantity}
                className="px-4 py-2"
              >
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="px-4 py-2"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={addToCart}
            className="mt-6 px-6 py-2 w-full bg-blue-500 text-white font-semibold rounded-md"
          >
            Thêm vào giỏ hàng
          </button>
          <p className="mt-4">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
