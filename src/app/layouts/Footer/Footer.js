import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-[#4A1A1A] text-white text-center py-6">
      <div className="flex justify-center space-x-4 mb-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebookF} className="text-lg hover:text-gray-300" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} className="text-lg hover:text-gray-300" />
        </a>
      </div>
      <div className="text-sm text-gray-300">
        <p className="mb-2">© 2024, Maison Du Parfum Do Shopify cung cấp</p>
        <p className="space-x-2">
          <a href="#refund-policy" className="hover:underline">Chính sách hoàn tiền</a> ·
          <a href="#privacy-policy" className="hover:underline">Chính sách quyền riêng tư</a> ·
          <a href="#terms-service" className="hover:underline">Điều khoản dịch vụ</a> ·
          <a href="#shipping-policy" className="hover:underline">Chính sách vận chuyển</a> ·
          <a href="#contact-info" className="hover:underline">Thông tin liên hệ</a>
        </p>
      </div>
    </footer>
  );
}
