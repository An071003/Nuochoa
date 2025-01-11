import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { message } from "antd";
import { API_URL } from "../../../config/webpack.config";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const Arrow = ({ className, style, onClick, direction }) => (
  <button
    style={{
      ...style,
      color: "gray", 
      border: "none", 
      padding: "0", 
      background: "transparent",
      position: "absolute", 
      top: "45%", 
      transform: "translateY(-50%)", 
      left: direction === "left" ? "-40px" : "auto", 
      right: direction === "right" ? "-40px" : "auto", 
      outline: "none",
    }}
    onClick={onClick}
  >
    {direction === "left" ? <SlArrowLeft size={50} /> : <SlArrowRight size={50} />}
  </button>
);

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Fetch the product details
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

  // Quantity increment and decrement
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity((prev) => prev - 1);

  // Add product to cart
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
        `Đã thêm ${quantity} sản phẩm ${product.name} vào giỏ hàng!`
      );
    } catch (err) {
      navigate("/login", { replace: true });
      message.error(err.message);
    }
  };

  // Handle loading and error states
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

  const sliderLargeSettings = {
    asNavFor: nav2,
    ref: (slider) => setNav1(slider),
    arrows: true,
    prevArrow: <Arrow direction="left" />,
    nextArrow: <Arrow direction="right" />,
    beforeChange: (_, next) => setSelectedImageIndex(next),
  };

  const sliderSmallSettings = {
    asNavFor: nav1,
    ref: (slider) => setNav2(slider),
    slidesToShow: 5,
    swipeToSlide: true,
    focusOnSelect: true,
  };

  return (
    <div className="container mx-auto my-10 px-4 w-full max-w-7xl">
      <div className="flex flex-col md:flex-row">
        {/* Main Image Slider */}
        <div className="md:w-1/2 p-4">
          <Slider {...sliderLargeSettings}>
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

          {/* Thumbnail Slider */}
          <div className="mt-4">
            <Slider {...sliderSmallSettings}>
              {product.images?.map((image, index) => (
                <div key={index} className="px-2">
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-full h-full object-cover rounded-md transition-opacity ${selectedImageIndex === index ? "opacity-100" : "opacity-50"}`}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Product Information */}
        <div className="md:w-1/2 mx-10 p-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-xl mt-6 text-red-600">{product.price.toLocaleString()} VND</p>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Số lượng:</h3>
            <div className="flex items-center mt-4 border-2 border-black w-fit rounded-md">
              <button onClick={decreaseQuantity} className="px-4 py-2">-</button>
              <span className="px-4 py-2">{quantity}</span>
              <button onClick={increaseQuantity} className="px-4 py-2">+</button>
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
