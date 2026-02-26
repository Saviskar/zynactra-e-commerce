"use client";

import { useCart } from "@/store/useCart";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { placeOrder } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
    const { items, getTotalPrice, clearCart } = useCart();
    const router = useRouter();
    const [isSuccess, setIsSuccess] = useState(false);
    const [orderId, setOrderId] = useState("");

    const subtotal = getTotalPrice();
    const shipping = items.length > 0 ? 10.0 : 0;
    const total = subtotal + shipping;

    const mutation = useMutation({
        mutationFn: placeOrder,
        onSuccess: (data) => {
            setIsSuccess(true);
            setOrderId(data.orderId);
            clearCart();
        },
    });

    if (isSuccess) {
        return (
            <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4">
                <div className="flex max-w-md flex-col items-center space-y-4 text-center">
                    <CheckCircle2 className="h-16 w-16 text-green-500" />
                    <h1 className="text-3xl font-bold tracking-tight">Order Confirmed</h1>
                    <p className="text-muted-foreground">
                        Thank you for your purchase. Your order number is{" "}
                        <span className="font-mono font-medium text-foreground">{orderId}</span>
                    </p>
                    <div className="pt-4">
                        <Button variant="outline" onClick={() => router.push("/")}>
                            Return to Shop
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6">
            <Link
                href="/"
                className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Shop
            </Link>

            <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Checkout</h2>
                        <p className="text-muted-foreground mt-1 text-sm">
                            Review your items and place your order.
                        </p>
                    </div>

                    <div className="rounded-lg border border-border bg-background p-6 space-y-4 shadow-sm">
                        <h3 className="font-semibold border-b border-border pb-2">Order Items</h3>
                        {items.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
                        ) : (
                            <ul className="space-y-4">
                                {items.map((item) => (
                                    <li key={item.product.id} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-3">
                                            <span className="text-muted-foreground">{item.quantity}x</span>
                                            <span className="font-medium line-clamp-1 max-w-[180px]">{item.product.name}</span>
                                        </div>
                                        <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div>
                    <div className="sticky top-24 rounded-lg border border-border bg-background p-6 shadow-sm space-y-6">
                        <h3 className="font-semibold text-lg">Order Summary</h3>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between pb-3 border-b border-border">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between pb-3 border-b border-border">
                                <span className="text-muted-foreground">Shipping Estimate</span>
                                <span>${shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-base pt-1">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        {mutation.isError && (
                            <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-md border border-red-500/20">
                                {mutation.error.message}
                            </div>
                        )}

                        <Button
                            className="w-full"
                            size="lg"
                            disabled={items.length === 0 || mutation.isPending}
                            onClick={() => mutation.mutate({ items, total })}
                        >
                            {mutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing Order...
                                </>
                            ) : (
                                "Place Order"
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
