import React, { useState, useEffect } from "react";
import { Modal, Form, Input, InputNumber, Button, Upload, message } from "antd";
import MDEditor from "@uiw/react-md-editor";
import { UploadOutlined } from "@ant-design/icons";

export default function EditProductModal({ visible, onClose, onSubmit, product }) {
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (product) {
            setDescription(product.description || "");
            setImages(product.images || []);
        } else {
            setDescription("");
            setImages([]);
        }
    }, [product]);

    const handleUpload = async (file) => {
        // Validate image file type (e.g., only .jpg, .png)
        const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validImageTypes.includes(file.type)) {
            message.error("Invalid image type! Only JPG, PNG, and GIF are allowed.");
            return false;
        }

        // Validate file size (e.g., max 5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            message.error("Image size should be less than 5MB.");
            return false;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file); // Convert to Base64
        reader.onload = () => {
            setImages((prev) => [...prev, reader.result]); // Add image to list
            message.success("Image uploaded successfully!");
        };
        reader.onerror = (error) => {
            message.error("Error uploading image: " + error.message);
        };

        return false; // Prevent the default upload behavior
    };

    const handleRemoveImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index)); // Remove image from list
    };

    return (
        <Modal
            title={null}
            open={visible}
            onCancel={onClose}
            footer={null}
            centered
            width="90%" // Responsive modal width
            maxWidth={800} // Max width for larger screens
        >
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-[#B76E79]">Edit Product</h2>
            </div>
            <Form
                layout="vertical"
                onFinish={(values) => onSubmit({ ...values, description, images })}
                initialValues={
                    product
                        ? {
                              name: product.name,
                              price: product.price,
                              category: product.category,
                              brand: product.brand,
                              countInStock: product.countInStock,
                          }
                        : {}
                }
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
                            label={<span className="font-semibold text-gray-600">Images</span>}
                        >
                            <Upload
                                beforeUpload={handleUpload} // Handle upload manually
                                showUploadList={false}
                            >
                                <Button icon={<UploadOutlined />}>Upload Image</Button>
                            </Upload>
                            {/* Display uploaded images */}
                            <div className="mt-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                {images.map((img, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={img}
                                            alt={`Uploaded ${index}`}
                                            className="max-h-24 rounded-md"
                                        />
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
                    <MDEditor value={description} onChange={setDescription} height={200} />
                </Form.Item>

                <Form.Item className="flex justify-center">
                    <Button type="primary" htmlType="submit">
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
