import React, { useState, useEffect } from "react";
import CheckoutSummary from "./CheckoutSummary";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "./partials/Breadcrumb";

const CheckoutInfo = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getCartItemsFromStorage = () => {
        try {
            return JSON.parse(localStorage.getItem("cartItems")) || location.state?.cartItems || [];
        } catch (error) {
            return [];
        }
    };

    const getFormDataFromStorage = () => {
        try {
            return JSON.parse(localStorage.getItem("formData")) || {
                email: "",
                firstName: "",
                lastName: "",
                address: "",
                city: "",
                postalCode: "",
                phone: "",
            };
        } catch (error) {
            return {
                email: "",
                firstName: "",
                lastName: "",
                address: "",
                city: "",
                postalCode: "",
                phone: "",
            };
        }
    };

    const [cartItems, setCartItems] = useState(getCartItemsFromStorage);
    const [formData, setFormData] = useState(getFormDataFromStorage);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        localStorage.setItem("formData", JSON.stringify(formData));
    }, [cartItems, formData]);

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const validateForm = () => {
        const { email, firstName, lastName, address, city, phone } = formData;
        const newErrors = {};

        if (!email) newErrors.email = "Vui lòng nhập email.";
        if (!firstName) newErrors.firstName = "Vui lòng nhập tên.";
        if (!lastName) newErrors.lastName = "Vui lòng nhập họ.";
        if (!address) newErrors.address = "Vui lòng nhập địa chỉ.";
        if (!city) newErrors.city = "Vui lòng nhập thành phố.";
        if (!phone) newErrors.phone = "Vui lòng nhập số điện thoại.";

        return newErrors;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
    };

    const handleNextStep = () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        navigate("/checkout/payment", { state: { cartItems, formData } });
    };

    const steps = [
        { index: 1, label: "Giỏ hàng", path: "/cart" },
        { index: 2, label: "Thông tin", path: "/checkout/info" },
        { index: 3, label: "Thanh toán", path: null },
    ];

    const handleBackToCart = () => {
        navigate("/cart");
    };

    return (
        <div className="container mx-auto p-14 flex flex-col lg:flex-row lg:space-x-4">
            <div className="w-full lg:w-2/3 bg-white shadow-md rounded-lg p-6">
                <div className="flex justify-center mb-6">
                    <Breadcrumb steps={steps} currentStep={2} />
                </div>
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-2">Liên hệ</h2>
                    <div>
                        <InputField
                            id="ip-email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            label="Email"
                            error={errors.email}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <h2 className="text-lg font-bold mb-2">Địa chỉ giao hàng</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <InputField
                            id="ip-first-name"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            label="Tên"
                            error={errors.firstName}
                        />
                        <InputField
                            id="ip-last-name"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            label="Họ"
                            error={errors.lastName}
                        />
                    </div>
                    <InputField
                        id="ip-address"
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        label="Địa chỉ"
                        error={errors.address}
                    />
                    <div className="grid grid-cols-2 gap-3 mt-3">
                        <InputField
                            id="ip-city"
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            label="Thành phố"
                            error={errors.city}
                        />
                        <InputField
                            id="ip-postal-code"
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            label="Mã bưu chính (không bắt buộc)"
                        />
                    </div>
                    <InputField
                        id="ip-phone"
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        label="Số điện thoại"
                        error={errors.phone}
                    />
                </div>
                <div className="flex justify-between">
                    <div className="pt-1 text-left">
                        <button
                            className="btn btn-secondary px-6 py-2 text-gray-800 rounded-md hover:underline hover:text-red-600 transition"
                            onClick={handleBackToCart}
                        >
                            Quay trở về giỏ hàng
                        </button>
                    </div>
                    <div className="text-right">
                        <button
                            onClick={handleNextStep}
                            className="px-6 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Chuyển đến phần vận chuyển
                        </button>
                    </div>
                </div>
            </div>
            <CheckoutSummary cartItems={cartItems} shippingCost={0} total={total} />
        </div>
    );
};

// Reusable Input Field component for simplicity
const InputField = ({ id, type, name, value, onChange, label, error }) => (
    <div className="relative mb-4">
        <input
            id={id}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={`peer block w-full border rounded-md px-3 pt-5 pb-2 text-sm text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${error ? "border-red-500" : "border-gray-300"}`}
            placeholder={label}
        />
        <label
            htmlFor={id}
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-50 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
        >
            {label}
        </label>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);

export default CheckoutInfo;
