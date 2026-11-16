
export default function PaymentSuccessPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">

            <div className="text-center border rounded-2xl p-10 shadow-sm">

                <div className="text-6xl mb-5">
                    ✅
                </div>

                <h1 className="text-3xl font-bold text-green-600">
                    Payment Successful!
                </h1>

                <p className="text-gray-500 mt-3">
                    Thank you for your purchase.
                    Your payment has been received.
                </p>

                <a
                    href="/Products"
                    className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                    Continue Shopping
                </a>

            </div>

        </div>
    );
}
