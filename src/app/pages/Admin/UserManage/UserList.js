import React, { useEffect, useState } from "react";
import { Table, Spin, Alert, Pagination } from "antd";
import { getUserList } from "../../../modules/Admin/UserManage/getUserList";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUserList();
        if (Array.isArray(data.users)) {
          setUsers(data.users); // Access the `users` key in the API response
        } else {
          console.error("Expected an array, received:", data);
          setError("Unexpected API response format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const paginatedData = users.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const columns = [
    {
      title: <span className="text-[#B76E79] font-bold">STT</span>,
      key: "index",
      width: "5%",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: <span className="text-[#B76E79] font-bold">Name</span>,
      dataIndex: "name",
      key: "name",
      width: "30%", 
    },
    {
      title: <span className="text-[#B76E79] font-bold">Email</span>,
      dataIndex: "email",
      key: "email",
    },
    {
      title: <span className="text-[#B76E79] font-bold">Avatar</span>,
      dataIndex: "avatar",
      key: "avatar",
      width: "5%",
      render: (avatar) => (
        <img
          src={avatar || "https://icons.veryicon.com/png/o/miscellaneous/rookie-official-icon-gallery/225-default-avatar.png"}
          alt="Avatar"
          className="w-10 h-10 rounded-full border-2 border-[#B76E79]"
        />
      ),
    },
    {
      title: <span className="text-[#B76E79] font-bold">Role</span>,
      dataIndex: "role",
      key: "role",
    },
  ];

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center bg-[#F5F5F5]">
        <Spin tip="Loading users..." />
      </div>
    );

  if (error)
    return (
      <div className="h-screen flex justify-center items-center bg-[#F5F5F5]">
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );

  if (users.length === 0)
    return (
      <div className="h-screen flex justify-center items-center bg-[#F5F5F5]">
        <Alert message="No users found" description="No users available in the system." type="info" showIcon />
      </div>
    );

  return (
    <div className="h-full bg-[#F5F5F5] flex justify-center items-center">
      <div className="w-full min-h-[95%] max-w-5xl bg-[#FFF6E3] shadow-lg border border-[#B76E79] rounded-lg my-4 p-5 flex flex-col">
        <h1 className="text-2xl font-semibold text-[#B76E79] mb-5 text-center">User List</h1>

        <div className="flex-grow">
          <Table
            dataSource={paginatedData}
            columns={columns}
            rowKey="_id"
            bordered
            pagination={false}
          />
        </div>
        <div className="mt-4 flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={users.length}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
}