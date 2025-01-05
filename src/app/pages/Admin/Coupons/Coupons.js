import React, { useEffect, useState } from "react";
import { Table, Spin, Alert, Pagination } from "antd";
import { getCouponList } from "../../../modules/Admin/Coupon/getCouponList";

export default function CouponList() {
  const [coupons, setCoupons] = useState([]); // Đảm bảo khởi tạo là mảng rỗng
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Số mục trên mỗi trang

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const data = await getCouponList();
        setCoupons(data || []); // Đảm bảo luôn là mảng
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const paginatedData = coupons.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    {
      title: <span className="text-[#B76E79] font-bold">STT</span>,
      key: "index",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (value) => `${value}%`,
    },
    {
      title: "Expiration Date",
      dataIndex: "expirationDate",
      key: "expirationDate",
      render: (value) => new Date(value).toLocaleDateString(),
    },
  ];

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center bg-[#F5F5F5]">
        <Spin tip="Loading coupons..." />
      </div>
    );
  if (error)
    return (
      <div className="h-screen flex justify-center items-center bg-[#F5F5F5]">
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );

  return (
    <div className="h-full bg-[#F5F5F5] flex justify-center items-center">
      <div className="w-full min-h-[95%] max-w-5xl bg-[#FFF6E3] shadow-lg border border-[#B76E79] rounded-lg my-4 p-5 flex flex-col">
        <h1 className="text-2xl font-semibold text-[#B76E79]">Coupon List</h1>
        <div className="flex-grow">
          <Table dataSource={paginatedData} columns={columns} rowKey="_id" pagination={false} />
        </div>
        <div className="mt-4 flex justify-center items-end">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={coupons.length}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
}