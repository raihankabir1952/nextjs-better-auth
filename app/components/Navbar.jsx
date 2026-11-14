"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "../lib/auth-client";
import { signOut } from "../lib/auth-client";
import { Button, Spinner } from "@heroui/react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session , isPending} = useSession()

    if(isPending){
         return (
    <div className="flex items-center gap-4">
      <Spinner />
    </div>
  );
    }

    console.log(session);

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
                        <span className="sr-only">Menu</span>

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
                        <Link href="#">Features</Link>
                    </li>

                    <li>
                        <Link href="#">Dashboard</Link>
                    </li>

                    <li>
                        <Link href="#">Pricing</Link>
                    </li>
                </ul>

                {/* Desktop Auth Buttons */}
                <div className="hidden items-center gap-4 md:flex">
                    {session ? (
                        <>
                            <span>Welcome, {session.user.name}</span>
                            <Button
                                onPress={() => signOut()}
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
                    )
                    }

                    {/* <Link
                        href="/sign-up"
                        prefetch={false}
                        className="rounded-lg bg-primary px-4 py-2 text-white"
                    >
                        Sign Up
                    </Link> */}
                </div>
            </header>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <li className="mt-4 flex flex-col gap-3 border-t border-separator pt-4">
                    {session ? (
                        <>
                            <span className="block py-2">
                                Welcome, {session.user.name}
                            </span>

                            <Link
                                href="/logout"
                                className="block py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Logout
                            </Link>
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
                </li>
            )}
        </nav>
    );
}
