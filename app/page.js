
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 45,
    category: "Electronics",
    emoji: "🎧",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 65,
    category: "Accessories",
    emoji: "⌚",
  },
  {
    id: 3,
    name: "Casual Backpack",
    price: 35,
    category: "Fashion",
    emoji: "🎒",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">

      {/* Hero Section */}
      <section className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-24 text-center md:py-32">

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
          Welcome to ACME Store
        </span>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          Discover Products You'll
          <span className="text-blue-600"> Love</span>
        </h1>

        <p className="max-w-xl text-gray-500">
          Find quality products at great prices.
          Shop your favorite items and enjoy a simple shopping experience.
        </p>

        <Link
          href="#products"
          className="rounded-lg bg-blue-600 px-7 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Shop Now
        </Link>
      </section>

      {/* Products Section */}
      <section
        id="products"
        className="mx-auto max-w-6xl px-6 pb-24"
      >
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">
            Featured Products
          </h2>

          <p className="mt-2 text-gray-500">
            Check out some of our popular products.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-52 items-center justify-center bg-gray-100 text-7xl">
                {product.emoji}
              </div>

              <div className="p-5">
                <p className="text-sm text-gray-500">
                  {product.category}
                </p>

                <h3 className="mt-2 text-lg font-semibold">
                  {product.name}
                </h3>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold">
                    ${product.price}
                  </span>

                  <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700">
                    View Product
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-6 text-center">
        <p className="text-sm text-gray-500">
          © 2026 ACME Store. All rights reserved.
        </p>
      </footer>

    </main>
  );
}
