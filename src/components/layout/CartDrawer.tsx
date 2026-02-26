"use client";

import { useCart } from "@/store/useCart";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart();
    const totalPrice = getTotalPrice();

    // Prevent hydration mismatch for persisted store
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-300"
                onClick={onClose}
            />
            <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l border-border bg-background p-6 shadow-lg transition-transform duration-300 ease-in-out flex flex-col">
                <div className="flex items-center justify-between border-b border-border pb-4">
                    <h2 className="text-lg font-bold">Shopping Cart</h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 hover:bg-muted transition-colors"
                    >
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                    {!mounted ? (
                        <div className="flex h-full items-center justify-center">
                            <span className="animate-pulse">Loading cart...</span>
                        </div>
                    ) : items.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                            <p className="text-muted-foreground">Your cart is empty.</p>
                            <Button onClick={onClose} variant="outline">
                                Continue Shopping
                            </Button>
                        </div>
                    ) : (
                        <ul className="space-y-6">
                            {items.map((item) => (
                                <li key={item.product.id} className="flex gap-4">
                                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border border-border bg-muted flex items-center justify-center text-xs text-muted-foreground">
                                        {/* Placeholder for image */}
                                        Image
                                    </div>
                                    <div className="flex flex-1 flex-col justify-between">
                                        <div className="flex justify-between">
                                            <h3 className="text-sm font-medium line-clamp-1">{item.product.name}</h3>
                                            <p className="text-sm font-medium pl-2">${item.product.price.toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-2 rounded-md border border-border p-1 text-sm bg-background">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                                    className="px-2"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="w-4 text-center text-xs font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="px-2"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.product.id)}
                                                className="text-muted-foreground hover:text-foreground transition-colors p-2"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {mounted && items.length > 0 && (
                    <div className="border-t border-border pt-4">
                        <div className="flex justify-between text-base font-medium mb-4">
                            <p>Subtotal</p>
                            <p>${totalPrice.toFixed(2)}</p>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                            Shipping and taxes calculated at checkout.
                        </p>
                        <div className="flex gap-2 flex-col">
                            <Link href="/checkout" onClick={onClose} passHref legacyBehavior>
                                <Button className="w-full" size="lg">
                                    Checkout
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
