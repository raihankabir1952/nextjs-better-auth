import React from "react";
import Link from "next/link";

const ProductCard = ({ product, isAdmin, onDelete, onEdit }) => {
    return (
        <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">

            {product.image && (
                <Link href={`/Products/${product._id}`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                    />
                </Link>
            )}

            <div className="p-4">
                <Link href={`/Products/${product._id}`}>
                    <h3 className="text-lg font-semibold hover:text-blue-600">
                        {product.name}
                    </h3>
                </Link>

                <p className="text-sm text-gray-500 mt-1">
                    {product.category}
                </p>

                <p className="text-lg font-bold mt-3">
                    ৳{product.price}
                </p>

                {isAdmin && (
                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={() => onEdit(product)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => onDelete(product._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;