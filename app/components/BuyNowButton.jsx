"use client";

export default function BuyNowButton({ productId }) {

    const handleBuyNow = async () => {
        const res = await fetch("http://localhost:5000/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productId: productId
            })
        });

        const data = await res.json();

        window.location.href = data.url;
    };

    return (
        <button
            onClick={handleBuyNow}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
            Buy Now
        </button>
    );
}