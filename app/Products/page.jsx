
"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useSession } from "../lib/auth-client";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);

    const { data: session } = useSession()
    console.log("Session:", session);
    console.log("User Role:", session?.user?.role);

    const isAdmin = session?.user?.role === "admin";

    console.log("Is Admin:", isAdmin);


    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch("http://localhost:5000/products");
            const data = await res.json();

            setProducts(data);
        };

        fetchProducts();
    }, []);

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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        isAdmin={isAdmin}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

        </div>
    );
};

export default ProductsPage;
