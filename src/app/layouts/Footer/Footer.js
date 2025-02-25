import React from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#283149] text-white text-center py-6">
      {/* Contact Info Section */}
      <div className="mb-4 text-sm text-gray-300">
        <p className="mb-2">Liên hệ qua:</p>
        
        {/* Email */}
        <p className="flex justify-center items-center space-x-2 mb-1">
          <FaEnvelope />
          <div className="text-xs sm:text-sm">lynm.xstadium@gmail.com</div>
        </p>
        
        {/* Phone */}
        <p className="flex justify-center items-center space-x-2">
          <FaPhoneAlt />
          <div className="text-xs sm:text-sm">Zalo/Điện thoại: 056 768 3939</div>
        </p>
      </div>

      {/* Footer Links Section */}
      <div className="text-sm text-gray-300">
        <p className="mb-2">Hyang-gi Origine Perfume</p>
        <p className="space-x-2">
          <a href="#refund-policy" className="hover:underline">
            Chính sách hoàn tiền
          </a>{" "}
          ·
          <a href="#privacy-policy" className="hover:underline">
            Chính sách quyền riêng tư
          </a>{" "}
          ·
          <a href="#terms-service" className="hover:underline">
            Điều khoản dịch vụ
          </a>{" "}
          ·
          <a href="#shipping-policy" className="hover:underline">
            Chính sách vận chuyển
          </a>{" "}
          ·
          <a href="#contact-info" className="hover:underline">
            Thông tin liên hệ
          </a>
        </p>
      </div>
    </footer>
  );
}
