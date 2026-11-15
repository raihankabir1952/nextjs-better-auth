
"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "../lib/auth-client";
import { Button, Spinner, toast } from "@heroui/react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session, isPending } = useSession();

    const userImage = session?.user?.image;
    const userName = session?.user?.name;
    const userRole = session?.user?.role;

    if (isPending) {
        return (
            <div className="flex items-center gap-4">
                <Spinner />
            </div>
        );
    }

    const handleLogout = async () => {
        const { error } = await signOut();

        if (error) {
            toast.danger("Logout Failed", {
                description: error.message || "Something went wrong",
            });
            return;
        }

        toast.success("Logout Successful", {
            description: "You have been logged out successfully.",
        });

        setIsMenuOpen(false);
    };

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
            <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">

                {/* Logo and Mobile Menu */}
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>

                    <Link href="/" className="font-bold">
                        ACME
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden items-center gap-4 md:flex">
                    <li>
                        <Link href="/Products">Products</Link>
                    </li>

                    {session && userRole === "admin" && (
                        <li>
                            <Link href="/admin">Admin Dashboard</Link>
                        </li>
                    )}

                    {session && userRole === "customer" && (
                        <li>
                            <Link href="/orders">My Orders</Link>
                        </li>
                    )}
                </ul>

                {/* Desktop Auth */}
                <div className="hidden items-center gap-4 md:flex">
                    {session ? (
                        <>
                            <div className="flex items-center gap-2">
                                {userImage ? (
                                    <img
                                        src={userImage}
                                        alt="Profile"
                                        className="h-9 w-9 rounded-full border object-cover"
                                    />
                                ) : (
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-default-200 font-semibold">
                                        {userName?.charAt(0).toUpperCase()}
                                    </div>
                                )}

                                <span>Welcome, {userName}</span>
                            </div>

                            <Button
                                onPress={handleLogout}
                                className="rounded-lg bg-red-700 px-4 py-2 text-white"
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/sign-in" prefetch={false}>
                                Login
                            </Link>

                            <Link
                                href="/sign-up"
                                prefetch={false}
                                className="rounded-lg bg-primary px-4 py-2 text-white"
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            </header>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="flex flex-col gap-3 border-t border-separator px-6 py-4 md:hidden">
                    <Link
                        href="/Products"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Products
                    </Link>

                    {session ? (
                        <>
                            {userRole === "admin" && (
                                <Link
                                    href="/admin"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Admin Dashboard
                                </Link>
                            )}

                            {userRole === "customer" && (
                                <Link
                                    href="/orders"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    My Orders
                                </Link>
                            )}

                            <div className="flex items-center gap-3 py-2">
                                {userImage ? (
                                    <img
                                        src={userImage}
                                        alt="Profile"
                                        className="h-10 w-10 rounded-full border object-cover"
                                    />
                                ) : (
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-default-200 font-semibold">
                                        {userName?.charAt(0).toUpperCase()}
                                    </div>
                                )}

                                <span>Welcome, {userName}</span>
                            </div>

                            <Button
                                onPress={handleLogout}
                                className="w-full rounded-lg bg-red-700 text-white"
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/sign-in"
                                prefetch={false}
                                className="block py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Login
                            </Link>

                            <Link
                                href="/sign-up"
                                prefetch={false}
                                className="block rounded-lg bg-primary px-4 py-2 text-center text-white"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
