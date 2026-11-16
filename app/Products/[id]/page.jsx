
import React from "react";
import { notFound } from "next/navigation";
import BuyNowButton from "../../components/BuyNowButton";

export const instant = false;

const ProductDetailsPage = async ({ params }) => {
    const { id } = await params;

    const res = await fetch(
        `http://localhost:5000/products/${id}`
    );

    if (!res.ok) {
        notFound();
    }

    const product = await res.json();

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                <div>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-96 object-cover rounded-xl"
                    />
                </div>

                <div className="flex flex-col justify-center">

                    <h1 className="text-3xl font-bold">
                        {product.name}
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Category: {product.category}
                    </p>

                    <p className="text-2xl font-bold mt-5">
                        ৳{product.price}
                    </p>

                    <BuyNowButton productId={product._id.toString()} />

                </div>

            </div>

        </div>
    );
};

export default ProductDetailsPage;
