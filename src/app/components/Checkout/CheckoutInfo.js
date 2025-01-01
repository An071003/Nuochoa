import React, { useState, useEffect } from "react";
import CheckoutSummary from "./CheckoutSummary";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "./partials/Breadcrumb";

export default function CheckoutInfo() {
    const navigate = useNavigate();
    const location = useLocation();

    // Lấy dữ liệu giỏ hàng từ localStorage hoặc location.state
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
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Lưu cartItems và formData vào localStorage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        localStorage.setItem("formData", JSON.stringify(formData));
    }, [cartItems, formData]);

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // Xóa lỗi khi người dùng nhập lại
    };

    const handleNextStep = () => {
        const { email, firstName, lastName, address, city, phone } = formData;
        const newErrors = {};

        if (!email) newErrors.email = "Vui lòng nhập email.";
        if (!firstName) newErrors.firstName = "Vui lòng nhập tên.";
        if (!lastName) newErrors.lastName = "Vui lòng nhập họ.";
        if (!address) newErrors.address = "Vui lòng nhập địa chỉ.";
        if (!city) newErrors.city = "Vui lòng nhập thành phố.";
        if (!phone) newErrors.phone = "Vui lòng nhập số điện thoại.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        navigate("/checkout/spinning", { state: { cartItems, formData } });
    };

    const steps = [
        { index: 1, label: "Giỏ hàng", path: "/cart" },
        { index: 2, label: "Thông tin", path: "/checkout/info" },
        { index: 3, label: "Vận chuyển", path: null },
        { index: 4, label: "Thanh toán", path: null },
    ];

    return (
        <div className="container mx-auto p-8 flex flex-col lg:flex-row lg:space-x-4">
            <div className="w-full lg:w-2/3 bg-white shadow-md rounded-lg p-6">
                <div className="flex justify-center mb-6">
                    <Breadcrumb steps={steps} currentStep={2} />
                </div>
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-2">Liên hệ</h2>
                    <div>
                        <div className="relative">
                            <input
                                id="ip-email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`peer block w-full border rounded-md px-3 pt-5 pb-2 text-sm text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                                placeholder="Email"
                            />
                            <label
                                htmlFor="ip-email"
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-50 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-[10px]"
                            >
                                Email
                            </label>
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                </div>
                <div className="mb-4">
                    <h2 className="text-lg font-bold mb-2">Địa chỉ giao hàng</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <div className="relative">
                                <input
                                    id="ip-first-name"
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`peer block w-full border rounded-md px-3 pt-5 pb-2 text-sm text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
                                    placeholder="Tên"
                                />
                                <label
                                    htmlFor="ip-first-name"
                                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-50 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-[10px]"
                                >
                                    Tên
                                </label>
                            </div>
                            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                            <div className="relative">
                                <input
                                    id="ip-last-name"
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`peer block w-full border rounded-md px-3 pt-5 pb-2 text-sm text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                                    placeholder="Họ"
                                />
                                <label
                                    htmlFor="ip-last-name"
                                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-50 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-[10px]"
                                >
                                    Họ
                                </label>
                            </div>
                            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                        </div>
                    </div>
                    <div>
                        <div className="relative mt-3">
                            <input
                                id="ip-address"
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className={`peer block w-full border rounded-md px-3 pt-5 pb-2 text-sm text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.address ? "border-red-500" : "border-gray-300"}`}
                                placeholder="Địa chỉ"
                            />
                            <label
                                htmlFor="ip-address"
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-50 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-[10px]"
                            >
                                Địa chỉ
                            </label>
                        </div>
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                        <div>
                            <div className="relative">
                                <input
                                    id="ip-city"
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className={`peer block w-full border rounded-md px-3 pt-5 pb-2 text-sm text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.city ? "border-red-500" : "border-gray-300"}`}
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="ip-city"
                                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-50 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-[10px]"
                                >
                                    Thành phố
                                </label>
                            </div>
                            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                        </div>
                        <div>
                            <div className="relative">
                                <input
                                    id="ip-postal-code"
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    className="peer block w-full border rounded-md px-3 pt-5 pb-2 text-sm text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Mã bưu chính (không bắt buộc)"
                                />
                                <label
                                    htmlFor="ip-postal-code"
                                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-50 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-[10px]"
                                >
                                    Mã bưu chính (không bắt buộc)
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="relative mt-3">
                            <input
                                id="ip-phone"
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={`peer block w-full border rounded-md px-3 pt-5 pb-2 text-sm text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                                placeholder="Số điện thoại"
                            />
                            <label
                                htmlFor="ip-phone"
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-50 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-[10px]"
                            >
                                Số điện thoại
                            </label>


                        </div>
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                </div>
                <div className="mt-6 text-right">
                    <button
                        onClick={handleNextStep}
                        className="px-6 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Chuyển đến phần vận chuyển
                    </button>
                </div>
            </div>
            <CheckoutSummary cartItems={cartItems} shippingCost={0} total={total} />
        </div>
    );
}
