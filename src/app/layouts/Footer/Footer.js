import React from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#283149] text-white text-center py-6">
      <div className="mb-4 text-sm text-gray-300">
        <p className="mb-2">Liên hệ qua:</p>
        <p className="flex justify-center items-center space-x-2 mb-1">
          <FaEnvelope />
          <a
            href="mailto:maisonduparfum@example.com"
            className="hover:underline"
          >
            maisonduparfum@example.com
          </a>
        </p>
        <p className="flex justify-center items-center space-x-2">
          <FaPhoneAlt />
          <a href="tel:+84123456789" className="hover:underline">
            Zalo/Điện thoại: +84 123 456 789
          </a>
        </p>
      </div>
      <div className="text-sm text-gray-300">
        <p className="mb-2">© 2024, Maison Du Parfum Do Shopify cung cấp</p>
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
