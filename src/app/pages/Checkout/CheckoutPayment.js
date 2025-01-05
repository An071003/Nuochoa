import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CheckoutSummary from "./CheckoutSummary"; 
import Breadcrumb from "./partials/Breadcrumb";

export default function CheckoutPayment() {
  const navigate = useNavigate();
  const location = useLocation();
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
  const [paymentMethod, setPaymentMethod] = useState("COD"); // "COD" - Thanh toán khi nhận hàng, "QRCode" - Thanh toán qua QR

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [cartItems, formData]);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleEditInfo = () => {
    navigate("/checkout/info");
  };

  const handleProceedToPayment = () => {
    navigate("/checkout/payment", { state: { formData, cartItems, paymentMethod } });
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const steps = [
    { index: 1, label: "Giỏ hàng", path: "/cart" },
    { index: 2, label: "Thông tin", path: "/checkout/info" },
    { index: 3, label: "Thanh toán", path: "/checkout/Payment" },
  ];


  return (
    <div className="container mx-auto p-14 flex flex-col lg:flex-row lg:space-x-4">
      {/* Phần thông tin chính */}
      <div className="w-full lg:w-2/3 bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-center mb-12">
          <Breadcrumb steps={steps} currentStep={3} />
        </div>
        {/* Thông tin liên hệ và địa chỉ giao hàng */}
        <table className="min-w-full table-auto text-sm my-5 border-collapse mb-6">
          <tbody>
            <tr className="border border-gray-300">
              <td className="font-sans font-bold py-2 px-4 text-gray-700 w-1/4 text-left">
                Liên hệ:
              </td>
              <td className="py-2 px-4 text-gray-800 text-left">{formData.email}</td>
              <td className="py-2 text-gray-800 w-fit text-center">
                <button
                  onClick={handleEditInfo}
                  className="text-blue-500 hover:text-blue-700 underline ml-2"
                >
                  Thay đổi
                </button>
              </td>
            </tr>
            <tr className="border border-gray-300">
              <td className="font-sans font-bold py-2 px-4 text-gray-700 w-1/4 text-left">
                Thanh toán đến:
              </td>
              <td className="py-2 px-4 text-gray-800 text-left">
                {formData.address}, {formData.city}
              </td>
              <td className="py-2 text-gray-800 w-fit text-center">
                <button
                  onClick={handleEditInfo}
                  className="text-blue-500 hover:text-blue-700 underline ml-2"
                >
                  Thay đổi
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Lựa chọn phương thức Thanh toán */}
        <h1 className="font-sans text-2xl font-bold mb-4 mt-1">Phương thức Thanh toán</h1>
        <div className="space-y-4">
          <div>
            <input
              type="radio"
              id="COD"
              name="paymentMethod"
              checked={paymentMethod === "COD"}
              onChange={() => handlePaymentMethodChange("COD")}
              className="mr-2"
            />
            <label htmlFor="COD" className="font-sans font-bold">Thanh toán khi nhận hàng</label>
          </div>
          <div>
            <input
              type="radio"
              id="QRCode"
              name="paymentMethod"
              checked={paymentMethod === "QRCode"}
              onChange={() => handlePaymentMethodChange("QRCode")}
              className="mr-2"
            />
            <label htmlFor="QRCode" className="font-sans font-bold">Thanh toán qua QRCode</label>
          </div>
        </div>

        {/* Nút chuyển đến phần thanh toán */}
        <div className="flex justify-between mt-6">
          <div className="pt-1 text-left">
            <button
              className="btn btn-secondary px-6 py-2 text-gray-800 rounded-md hover:underline hover:text-red-600 transition"
              onClick={handleEditInfo}
            >
              Quay trở về thông tin
            </button>
          </div>
          <div className="text-right">
            <button
              onClick={handleProceedToPayment}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>

      {/* Phần Summary */}
      <CheckoutSummary
        cartItems={cartItems}
        total={total}
      />
    </div>
  );
}
