import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSummary from "./CheckoutSummary";
import Breadcrumb from "./partials/Breadcrumb";

export default function CheckoutPayment() {
  const navigate = useNavigate();

  // Nhận dữ liệu từ localStorage hoặc location.state
  const initialCartItems = JSON.parse(localStorage.getItem("cartItems")) || location.state?.cartItems || [];
  const initialFormData = JSON.parse(localStorage.getItem("formData")) || {
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  };
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [formData, setFormData] = useState(initialFormData);
  const [shippingCost, setShippingCost] = useState(0);

  // Trạng thái lưu phương thức thanh toán
  const [paymentMethod, setPaymentMethod] = useState("COD"); // COD: Cash on Delivery, Bank: Thanh toán qua ngân hàng
  const [showQRCode, setShowQRCode] = useState(false); // Trạng thái để hiển thị QR Code

  // Tính tổng giá trị giỏ hàng
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Xử lý sự kiện khi người dùng chọn phương thức thanh toán
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setShowQRCode(method === "Bank"); // Hiển thị QR Code nếu chọn thanh toán qua ngân hàng
  };

  // Hàm xử lý khi người dùng hoàn thành thanh toán
  const handleSubmitPayment = () => {
    // Điều hướng đến trang hoàn tất thanh toán
    navigate("/checkout/success");
  };

  const steps = [
    { index: 1, label: "Giỏ hàng", path: "/cart" },
    { index: 2, label: "Thông tin", path: "/checkout/info" },
    { index: 3, label: "Vận chuyển", path: "/checkout/spinning" },
    { index: 4, label: "Thanh toán", path: "/checkout/payment" },
  ];

  return (
    <div className="container mx-auto p-14 flex flex-col lg:flex-row lg:space-x-4">
      {/* Phần thông tin thanh toán */}
      <div className="w-full lg:w-2/3 border bg-white shadow-lg rounded-lg p-6 flex flex-col min-h-[450px]">
        <div>
          <div className="flex justify-center mb-12">
            <Breadcrumb steps={steps} currentStep={4} />
          </div>
          <h2 className="text-2xl font-bold mb-6">Phương thức thanh toán</h2>

          {/* Phương thức thanh toán khi nhận hàng */}
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="cod"
              name="paymentMethod"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={() => handlePaymentMethodChange("COD")}
              className="mr-2"
            />
            <label htmlFor="cod" className="text-lg">
              Thanh toán khi nhận hàng
            </label>
          </div>

          {/* Phương thức thanh toán qua ngân hàng */}
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="bank"
              name="paymentMethod"
              value="Bank"
              checked={paymentMethod === "Bank"}
              onChange={() => handlePaymentMethodChange("Bank")}
              className="mr-2"
            />
            <label htmlFor="bank" className="text-lg">
              Thanh toán qua ngân hàng
            </label>
          </div>

          {/* Hiển thị QR Code khi thanh toán qua ngân hàng */}
          {showQRCode && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Quét mã QR để thanh toán</h3>
              <img
                src="/assets/qrcode.png" // Đảm bảo QR code có trong thư mục assets
                alt="QR Code"
                className="mx-auto"
              />
            </div>
          )}
        </div>

        {/* Các nút ở dưới cùng của card */}
        {/* <div className="flex  mt-6">
          <div className="pt-1 w-full lg:w-auto">
            <button
              className="btn btn-secondary px-6 py-2 text-gray-800 rounded-md hover:underline hover:text-red-600 transition w-full lg:w-auto"
              onClick={() => navigate(-1)}
            >
              Quay trở về thông tin
            </button>
          </div>
          <div className="w-full lg:w-auto">
            <button
              onClick={handleSubmitPayment}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition w-full lg:w-auto"
            >
              Chuyển đến phần thanh toán
            </button>
          </div>
        </div>
      </div> */}
        <div className="flex items-center justify-between mt-auto space-x-4">
          <div className="w-full lg:w-auto">
            <button
              className="btn btn-secondary px-6 py-2 text-gray-800 rounded-md hover:underline hover:text-red-600 transition w-full lg:w-auto"
              onClick={() => navigate(-1)}
            >
              Quay trở về thông tin
            </button>
          </div>
          <div className="w-full lg:w-auto">
            <button
              onClick={handleSubmitPayment}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition w-full lg:w-auto"
            >
              Chuyển đến phần thanh toán
            </button>
          </div>
        </div>
      </div>

      {/* Phần Summary */}
      <CheckoutSummary
        cartItems={cartItems}
        shippingCost={shippingCost}
        total={total}
      />
    </div>
  );
}
