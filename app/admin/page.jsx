
"use client";

import React, { useState } from "react";
import { useSession } from "../lib/auth-client";

const AdminPage = () => {
    const { data: session, isPending } = useSession();

    const [product, setProduct] = useState({
        name: "",
        price: "",
        category: "",
        image: ""
    });

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    //check backend session
    const checkBackendSession = async () => {
        const res = await fetch('http://localhost:5000/api/me', {
            credentials: "include"
        })
        const data = await res.json();
        console.log("Backend Session", data);
    }

    // handle submit function
    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:5000/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        });

        const data = await res.json();

        console.log(data);
    };

    // Check session loading
    if (isPending) {
        return <p>Loading...</p>;
    }

    // Check whether user is logged in
    if (!session) {
        return <p>Please login first.</p>;
    }

    // Check admin role
    if (session.user.role !== "admin") {
        return <p>You are not authorized to access this page.</p>;
    }

    return (
        <div>
            <h2>Add New Product</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        placeholder="Enter product name"
                    />
                </div>

                <div>
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="Enter price"
                    />
                </div>

                <div>
                    <label>Category</label>
                    <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        placeholder="Enter category"
                    />
                </div>

                <div>
                    <label>Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={product.image}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                    />
                </div>

                <button type="submit">Add Product</button>
                <button
                    onClick={checkBackendSession}
                >
                    Check Backend Session
                </button>
            </form>
        </div>
    );
};

export default AdminPage;
