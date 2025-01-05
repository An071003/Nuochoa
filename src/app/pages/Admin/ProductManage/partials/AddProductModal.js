import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Button, Upload, message } from "antd";
import MDEditor from "@uiw/react-md-editor";
import { UploadOutlined } from "@ant-design/icons";

export default function AddProductModal({ visible, onClose, onSubmit }) {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleUpload = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // Đọc file dưới dạng Base64
    reader.onload = () => {
      setImage(reader.result); // Lưu Base64 hình ảnh vào state
      message.success("Image selected successfully!");
    };
    reader.onerror = (error) => {
      message.error("Error uploading image: " + error.message);
    };
  };

  return (
    <Modal
      title={null}
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={800} // Tăng chiều rộng modal
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#B76E79]">Add New Product</h2>
      </div>
      <Form
        layout="vertical"
        onFinish={(values) => onSubmit({ ...values, description, image })}
        initialValues={{
          name: "",
          price: 0,
          category: "",
          brand: "",
          countInStock: 0,
          image: "",
        }}
      >
        <div className="grid grid-cols-2 gap-x-6">
          {/* Left Column */}
          <div>
            <Form.Item
              name="name"
              label={<span className="font-semibold text-gray-600">Name</span>}
              rules={[{ required: true, message: "Please input the product name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="price"
              label={<span className="font-semibold text-gray-600">Price</span>}
              rules={[{ required: true, message: "Please input the price!" }]}
            >
              <InputNumber min={0} className="w-full" />
            </Form.Item>
            <Form.Item
              name="category"
              label={<span className="font-semibold text-gray-600">Category</span>}
              rules={[{ required: true, message: "Please input the category!" }]}
            >
              <Input />
            </Form.Item>
          </div>
          {/* Right Column */}
          <div>
            <Form.Item
              name="brand"
              label={<span className="font-semibold text-gray-600">Brand</span>}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="countInStock"
              label={<span className="font-semibold text-gray-600">Count In Stock</span>}
              rules={[{ required: true, message: "Please input the stock count!" }]}
            >
              <InputNumber min={0} className="w-full" />
            </Form.Item>
            {/* <Form.Item
              name="image"
              label={<span className="font-semibold text-gray-600">Image URL</span>}
            >
              <Input />
            </Form.Item> */}
            <Form.Item
              label={<span className="font-semibold text-gray-600">Upload Image</span>}
            >
              <Upload
                beforeUpload={(file) => {
                  handleUpload(file);
                  return false; // Chặn hành vi upload mặc định
                }}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
              {image && (
                <div className="mt-3">
                  <img src={image} alt="Uploaded" className="max-h-40 rounded-md" />
                </div>
              )}
            </Form.Item>
          </div>
        </div>
        <Form.Item
          label={<span className="font-semibold text-gray-600">Description</span>}
        >
          <MDEditor
            value={description}
            onChange={setDescription}
            height={200}
          />
        </Form.Item>
        <Form.Item className="flex justify-center">
          <Button type="primary" htmlType="submit">
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}