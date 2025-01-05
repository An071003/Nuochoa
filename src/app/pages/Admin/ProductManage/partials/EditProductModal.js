import React, { useState, useEffect } from "react";
import { Modal, Form, Input, InputNumber, Button } from "antd";
import MDEditor from "@uiw/react-md-editor";

export default function EditProductModal({ visible, onClose, onSubmit, product }) {
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (product) {
            setDescription(product.description || "");
        } else {
            setDescription("");
        }
    }, [product]);

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
                <h2 className="text-2xl font-bold text-[#B76E79]">Edit Product</h2>
            </div>
            <Form
                layout="vertical"
                onFinish={(values) => onSubmit({ ...values, description })}
                initialValues={
                    product
                        ? {
                            name: product.name,
                            price: product.price,
                            category: product.category,
                            brand: product.brand,
                            countInStock: product.countInStock,
                            image: product.image,
                        }
                        : {}
                }
            >
                <div className="grid grid-cols-2 gap-x-6">
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
                            name="image"
                            label={<span className="font-semibold text-gray-600">Image URL</span>}
                        >
                            <Input />
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
