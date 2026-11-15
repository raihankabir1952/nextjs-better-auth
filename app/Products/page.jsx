
"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch("http://localhost:5000/products");
            const data = await res.json();

            setProducts(data);
        };

        fetchProducts();
    }, []);

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
                    />
                ))}
            </div>

        </div>
    );
};

export default ProductsPage;
