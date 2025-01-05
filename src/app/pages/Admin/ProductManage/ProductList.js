import React, { useEffect, useState } from "react";
import { Table, Spin, Alert, Pagination, Button, Modal, Switch } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getProductList } from "../../../modules/Admin/Product/getProductList";
import { addProduct } from "../../../modules/Admin/Product/addProduct";
import { toggleFeaturedProduct } from "../../../modules/Admin/Product/toggleFeaturedProduct";
import AddProductModal from "./partials/AddProductModal";
import EditProductModal from "./partials/EditProductModal";
import { editProduct } from "../../../modules/Admin/Product/editProduct";
import { deleteProduct } from "../../../modules/Admin/Product/deleteProduct";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProductList();
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    throw new Error("Invalid data format");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    const handleToggleFeatured = async (id) => {
        try {
            await toggleFeaturedProduct(id); 
            const updatedProducts = await getProductList(); 
            setProducts(updatedProducts);
        } catch (error) {
            console.error("Error toggling featured product:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (id) => {
        Modal.confirm({
            title: "Are you sure you want to delete this product?",
            content: "This action cannot be undone.",
            okText: "Delete",
            okType: "danger",
            cancelText: "Cancel",
            centered: true,
            onOk: async () => {
                try {
                    await deleteProduct(id);
                    setLoading(true);
                    const updatedProducts = await getProductList();
                    setProducts(updatedProducts);
                } catch (error) {
                    console.error("Error deleting product:", error.message);
                } finally {
                    setLoading(false);
                }
            },
        });
    };

    const handleAddProduct = async (values) => {
        try {
            await addProduct(values);
            setIsModalVisible(false);
            setLoading(true);
            const updatedProducts = await getProductList();
            setProducts(updatedProducts);
        } catch (error) {
            console.error("Error adding product:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const paginatedData = products.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const columns = [
        {
            title: <span className="text-[#B76E79] font-bold">STT</span>,
            key: "index",
            render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
        },
        {
            title: <span className="text-[#B76E79] font-bold">Name</span>,
            dataIndex: "name",
            key: "name",
        },
        {
            title: <span className="text-[#B76E79] font-bold">Price</span>,
            dataIndex: "price",
            key: "price",
            render: (price) => formatPrice(price),
        },
        {
            title: <span className="text-[#B76E79] font-bold">Category</span>,
            dataIndex: "category",
            key: "category",
        },
        {
            title: <span className="text-[#B76E79] font-bold">brand</span>,
            dataIndex: "brand",
            key: "brand",
        }, 
        {
            title: <span className="text-[#B76E79] font-bold">countInStock</span>,
            dataIndex: "countInStock",
            key: "countInStock",
        },
        {
            title: <span className="text-[#B76E79] font-bold">Featured</span>,
            dataIndex: "isFeatured",
            key: "featured",
            render: (isFeatured, record) => (
                <Switch
                    checked={isFeatured}
                    onChange={() => handleToggleFeatured(record._id)}
                />
            ),
        },
        {
            title: <span className="text-[#B76E79] font-bold">Action</span>,
            key: "action",
            render: (_, record) => (
                <div className="flex gap-2">
                    <div
                        className="cursor-pointer text-sky-400 hover:text-sky-400 underline"
                        onClick={() => {
                            setEditingProduct(record);
                            setIsEditModalVisible(true);
                        }}
                    >
                        Edit
                    </div>
                    <div
                        className="cursor-pointer text-rose-400 hover:text-rose-500 underline"
                        onClick={() => handleDeleteProduct(record._id)}
                    >
                        Delete
                    </div>
                </div>
            ),
        },
    ];

    if (loading)
        return (
            <div className="h-screen flex justify-center items-center bg-[#F5F5F5]">
                <Spin tip="Loading products..." ><div/></Spin>
            </div>
        );
    if (error)
        return (
            <div className="h-screen flex justify-center items-center bg-[#F5F5F5]">
                <Alert message="Error" description={error} type="error" showIcon />
            </div>
        );
    if (!Array.isArray(products))
        return (
            <div className="h-screen flex justify-center items-center bg-[#F5F5F5]">
                <Alert message="Error" description="Data is not valid" type="error" showIcon />
            </div>
        );

    return (
        <div className="h-full bg-[#F5F5F5] flex justify-center items-center">
            <div className="w-full min-h-[95%] max-w-5xl bg-[#FFF6E3] shadow-lg border border-[#B76E79] rounded-lg my-4 p-5 flex flex-col">
                <div className="flex justify-between items-center mb-5">
                    <h1 className="text-2xl font-semibold text-[#B76E79]">Product List</h1>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsModalVisible(true)}
                    >
                        Add Product
                    </Button>
                </div>
                <div className="flex-grow">
                    <Table
                        columns={columns}
                        dataSource={paginatedData}
                        rowKey="_id"
                        bordered
                        pagination={false}
                    />
                </div>
                <div className="mt-4">
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={products.length}
                        onChange={(page) => setCurrentPage(page)}
                        className="flex justify-center items-center"
                    />
                </div>
            </div>

            <AddProductModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSubmit={handleAddProduct}
            />
            <EditProductModal
                visible={isEditModalVisible}
                onClose={() => {
                    setIsEditModalVisible(false);
                    setEditingProduct(null);
                }}
                onSubmit={async (values) => {
                    await editProduct(editingProduct._id, values);
                    setIsEditModalVisible(false);
                    setLoading(true);
                    const updatedProducts = await getProductList();
                    setProducts(updatedProducts);
                    setLoading(false);
                }}
                product={editingProduct}
            />
        </div>
    );
}
