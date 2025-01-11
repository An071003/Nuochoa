import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { message } from "antd";
import { API_URL } from "../../../config/webpack.config";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Full 100ml");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products/${id}`, {
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
      const cookie = await fetch(`${API_URL}/api/auth/verify-token`, {
        method: "GET",
        credentials: "include",
      });

      if (!cookie.ok) {
        throw new Error("Token không hợp lệ hoặc đã hết hạn.");
      }

      const response = await fetch(`${API_URL}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
          quantity,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Không thể thêm sản phẩm vào giỏ hàng");
      }

      message.success(
        `Đã thêm ${quantity} sản phẩm ${product.name} (${selectedSize}) vào giỏ hàng!`
      );
    } catch (err) {
      navigate("/login", { replace: true });
      message.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-sans text-gray-500">Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-sans text-red-500">{error}</p>
      </div>
    );
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="container mx-36 my-10 px-4 w-[70%] min-h-[600px]">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-4">
          <Slider {...sliderSettings}>
            {product.images?.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Product image ${index + 1}`}
                  className="w-full rounded-md"
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="md:w-1/2 p-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-xl mt-6 text-red-600">{product.price.toLocaleString()} VND</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Chọn kích thước:</h3>
            <div className="flex space-x-4 mt-2">
              {["Full 100ml", "Chiết 10ml", "Chiết 5ml"].map((size) => (
                <div
                  key={size}
                  className={`cursor-pointer px-4 py-2 border rounded-md text-center ${
                    selectedSize === size ? "bg-blue-500 text-white" : "bg-gray-100"
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
