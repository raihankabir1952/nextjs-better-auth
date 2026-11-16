"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useSession } from "../lib/auth-client";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editForm, setEditForm] = useState({
        name: "",
        price: "",
        category: "",
        image: ""
    });

    const { data: session } = useSession();
    const isAdmin = session?.user?.role === "admin";

    // Fetch all products
    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch("http://localhost:5000/products");
            const data = await res.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    // Delete product
    const handleDelete = async (productId) => {
        const res = await fetch(`http://localhost:5000/products/${productId}`, {
            method: "DELETE",
        });

        const data = await res.json();
        console.log(data);

        if (res.ok) {
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product._id !== productId)
            );
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    // Select product for editing
    const handleEdit = (product) => {
        setSelectedProduct(product);

        setEditForm({
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.image
        });
    };

    //handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(
            `http://localhost:5000/products/${selectedProduct._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editForm)
            }
        );

        const data = await res.json();

        console.log(data);

        if (res.ok) {
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === selectedProduct._id
                        ? { ...product, ...editForm }
                        : product
                )
            );

            setSelectedProduct(null);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">

            <div className="mb-8">
                <h2 className="text-3xl font-bold">
                    Our Products
                </h2>

                <p className="text-gray-500 mt-2">
                    Total available products: {products.length}
                </p>
            </div>

            {/* Edit Product Form */}
            {selectedProduct && (
                <div className="mb-8 border rounded-xl p-6">

                    <h3 className="text-2xl font-bold mb-4">
                        Edit Product
                    </h3>

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-3">

                            <input
                                type="text"
                                name="name"
                                value={editForm.name}
                                onChange={handleChange}
                                placeholder="Product name"
                                className="border p-2 rounded"
                            />

                            <input
                                type="number"
                                name="price"
                                value={editForm.price}
                                onChange={handleChange}
                                placeholder="Price"
                                className="border p-2 rounded"
                            />

                            <input
                                type="text"
                                name="category"
                                value={editForm.category}
                                onChange={handleChange}
                                placeholder="Category"
                                className="border p-2 rounded"
                            />

                            <input
                                type="text"
                                name="image"
                                value={editForm.image}
                                onChange={handleChange}
                                placeholder="Image URL"
                                className="border p-2 rounded"
                            />

                        </div>
                        <button
                            type="submit"
                            className="bg-green-600 gap-4 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                        >
                            Update Product

                        </button>
                    </form>
                </div>
            )}

            {/* Product List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {products.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        isAdmin={isAdmin}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ))}

            </div>

        </div>
    );
};

export default ProductsPage;
