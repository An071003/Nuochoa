import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Button, Upload, message } from "antd";
import MDEditor from "@uiw/react-md-editor";
import { UploadOutlined } from "@ant-design/icons";

export default function AddProductModal({ visible, onClose, onSubmit }) {
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]); // Lưu danh sách ảnh

  const handleUpload = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // Đọc file dưới dạng Base64
    reader.onload = () => {
      setImages((prev) => [...prev, reader.result]); // Thêm URL ảnh vào danh sách
      message.success("Image selected successfully!");
    };
    reader.onerror = (error) => {
      message.error("Error uploading image: " + error.message);
    };
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index)); // Xóa ảnh khỏi danh sách
  };

  return (
    <Modal
      title={null}
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width="90%" // Responsive width
      maxWidth={800} // Maximum width for large screens
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#B76E79]">Add New Product</h2>
      </div>
      <Form
        layout="vertical"
        onFinish={(values) => onSubmit({ ...values, description, images })}
        initialValues={{
          name: "",
          price: 0,
          category: "",
          brand: "",
          countInStock: 0,
        }}
      >
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
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
              rules={[{ required: true, message: "Please input the product brand!" }]}
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
            <Form.Item
              label={<span className="font-semibold text-gray-600">Upload Images</span>}
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
              <div className="mt-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {images.map((img, index) => (
                  <div key={index} className="relative">
                    <img src={img} alt={`Uploaded ${index}`} className="max-h-24 rounded-md" />
                    <Button
                      type="text"
                      danger
                      className="absolute top-1 right-1"
                      onClick={() => handleRemoveImage(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
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
            className="w-full" // Ensure the editor is responsive
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
