
import React from "react";

const ProductCard = ({ product }) => {
    return (
        <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">

            {product.image && (
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                />
            )}

            <div className="p-4">
                <h3 className="text-lg font-semibold">
                    {product.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                    {product.category}
                </p>

                <p className="text-lg font-bold mt-3">
                    ৳{product.price}
                </p>
            </div>

        </div>
    );
};

export default ProductCard;
