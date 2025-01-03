import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL
  const [product, setProduct] = useState(null); // Dữ liệu sản phẩm
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Lưu lỗi nếu xảy ra
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Full 100ml");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/products/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  const addToCart = async () => {
    try {
      // Gửi yêu cầu tới API để xác thực token (server sẽ lấy token từ cookie)
      const cookie = await fetch("http://localhost:5001/api/auth/verify-token", {
        method: "GET",  // Dùng GET để kiểm tra token
        credentials: "include",  // Đảm bảo cookie được gửi đi cùng yêu cầu
      });

      if (!cookie.ok) {
        throw new Error("Token không hợp lệ hoặc đã hết hạn.");
      }

      const data = await cookie.json();
      console.log("Xác thực thành công:", data);

      const response = await fetch("http://localhost:5001/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: id }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Không thể thêm sản phẩm vào giỏ hàng");
      }

      const cartData = await response.json();
      message.success(`Đã thêm ${quantity} sản phẩm ${product.name} (${selectedSize}) vào giỏ hàng!`);
      console.log("Giỏ hàng sau khi thêm sản phẩm:", cartData); // You can use this to update cart state if needed
    } catch (err) {
      message.error(err.message);
      console.error("Error in addToCart:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-500">Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-36 my-10 px-4 w-[70%] min-h-[600px]">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-[400px] h-[500px] object-cover"
          />
        </div>

        <div className="md:w-1/2 p-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-xl text-red-600">{product.price} VND</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Chọn kích thước:</h3>
            <div className="flex space-x-4 mt-2">
              {["Full 100ml", "Chiết 10ml", "Chiết 5ml"].map((size) => (
                <div
                  key={size}
                  className={`cursor-pointer px-4 py-2 border rounded-md text-center ${selectedSize === size ? "bg-blue-500 text-white" : "bg-gray-100"
                    }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </div>  
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Số lượng:</h3>
            <div className="flex items-center mt-4 border-2 border-black w-fit rounded-md">
              <button onClick={decreaseQuantity} className="px-4 py-2">
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button onClick={increaseQuantity} className="px-4 py-2">
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
