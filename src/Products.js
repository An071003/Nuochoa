import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
  // State để lưu trữ danh sách sản phẩm, trạng thái loading, và lỗi
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL của API từ biến môi trường
  const API_URL = process.env.REACT_APP_API_URL || 'https://web2-backend.vercel.app/api/products';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`); // Gửi request đến API
        setProducts(response.data); // Lưu dữ liệu sản phẩm vào state
      } catch (err) {
        setError(err.message || 'Failed to fetch products'); // Lưu thông báo lỗi nếu có
      } finally {
        setLoading(false); // Đặt trạng thái loading thành false
      }
    };

    fetchProducts(); // Gọi hàm lấy dữ liệu sản phẩm
  }, [API_URL]); // useEffect chạy lại nếu URL API thay đổi

  // Nếu đang tải dữ liệu, hiển thị "Loading..."
  if (loading) {
    return <p>Loading...</p>;
  }

  // Nếu có lỗi, hiển thị thông báo lỗi
  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  // Hiển thị danh sách sản phẩm sau khi tải dữ liệu thành công
  return (
    <div>
      <h1>Product List</h1>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.name}</li> // Giả sử sản phẩm có trường 'id' và 'name'
          ))}
        </ul>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default Products;
