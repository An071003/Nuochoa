import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CheckoutSummary from "./CheckoutSummary"; // Import CheckoutSummary
import Breadcrumb from "./partials/Breadcrumb";

export default function CheckoutSpinning() {
  const navigate = useNavigate();
  const location = useLocation();

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

  // Lưu dữ liệu vào localStorage khi có thay đổi
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [cartItems, formData]);

  // Hàm thay đổi phí vận chuyển
  const handleShippingChange = (cost) => {
    setShippingCost(cost);
  };

  // Hàm chỉnh sửa thông tin quay lại bước trước
  const handleEditInfo = () => {
    navigate("/checkout/info");
  };

  // Hàm chuyển đến phần thanh toán
  const handleProceedToPayment = () => {
    navigate("/checkout/payment", { state: { formData, cartItems, shippingCost } });
  };

  // Tính tổng giá trị giỏ hàng
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const steps = [
    { index: 1, label: "Giỏ hàng", path: "/cart" },
    { index: 2, label: "Thông tin", path: "/checkout/info" },
    { index: 3, label: "Vận chuyển", path: "/checkout/spinning" },
    { index: 4, label: "Thanh toán", path: null },
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
                Vận chuyển đến:
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

        {/* Lựa chọn phương thức vận chuyển */}
        <h1 className="font-sans text-2xl font-bold mb-4 mt-1">Vận chuyển</h1>
        <table className="min-w-full table-auto text-sm my-5 border-collapse border">
          <tbody>
            <tr className="border-b">
              <td className="py-2 px-4 text-gray-800 w-fit text-right">
                <label className="flex items-center font-sans font-bold py-2 text-left">
                  <input
                    type="radio"
                    name="shipping"
                    className="mr-2"
                    onChange={() => handleShippingChange(20000)}
                  />
                  Giao hàng tiêu chuẩn
                </label>
              </td>
              <td className="p-4 text-right">
                20,000₫
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 text-gray-800 w-fit text-right">
                <label className="flex items-center font-sans font-bold py-2 text-left">
                  <input
                    type="radio"
                    name="shipping"
                    className="mr-2"
                    onChange={() => handleShippingChange(50000)}
                  />
                  Giao hàng nhanh
                </label>
              </td>
              <td className="p-4 text-right text-">
                50,000₫
              </td>
            </tr>
          </tbody>
        </table>

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
