"use client";

import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";
import { useAuth } from "@/store/useAuth";
import { useCart } from "@/store/useCart";
import { useState } from "react";
import CartDrawer from "@/components/layout/CartDrawer";

export default function Header() {
    const { isAuthenticated, logout } = useAuth();
    const cartItemsCount = useCart((state) => state.items.length);
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
                    <Link href="/" className="text-xl font-bold tracking-tighter">
                        MINIMAL<span className="font-light">IST</span>
                    </Link>

                    <nav className="flex items-center gap-6">
                        <Link
                            href="/"
                            className="text-sm font-medium transition-colors hover:text-muted-foreground"
                        >
                            Shop
                        </Link>

                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/auth/login"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        logout();
                                    }}
                                    className="text-sm font-medium transition-colors hover:text-muted-foreground"
                                >
                                    Logout
                                </Link>
                            </div>
                        ) : (
                            <Link
                                href="/auth/login"
                                className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-muted-foreground"
                            >
                                <User className="h-4 w-4" />
                                <span className="hidden sm:inline-block">Login</span>
                            </Link>
                        )}

                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative flex items-center justify-center rounded-full p-2 transition-colors hover:bg-muted"
                            aria-label="Open cart"
                        >
                            <ShoppingBag className="h-5 w-5" />
                            {cartItemsCount > 0 && (
                                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
                                    {cartItemsCount}
                                </span>
                            )}
                        </button>
                    </nav>
                </div>
            </header>
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
