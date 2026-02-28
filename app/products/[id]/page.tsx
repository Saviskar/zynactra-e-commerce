"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/lib/api-client";
import { productSchema } from "@/lib/validations";
import { useCart } from "@/store/useCart";
import { ProductImage } from "@/components/shop/ProductImage";
import { QuantityPicker } from "@/components/shop/QuantityPicker";
import { AddToCartButton } from "@/components/shop/AddToCartButton";

export default function ProductDetailPage() {
    const params = useParams<{ id: string }>();
    const [quantity, setQuantity] = useState(1);
    const addItem = useCart((state) => state.addItem);

    const { data: product, isLoading, isError } = useQuery({
        queryKey: ["product", params?.id],
        queryFn: async () => {
            if (!params?.id) throw new Error("No ID");
            const data = await fetchProductById(params.id);
            // Validate the incoming API response with Zod
            const parsed = productSchema.parse(data);
            return parsed;
        },
        retry: false,
        enabled: !!params?.id
    });

    if (isLoading) {
        return (
            <div className="container mx-auto max-w-6xl px-4 py-8 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                    <div className="aspect-square bg-muted animate-pulse rounded-md w-full"></div>
                    <div className="flex flex-col space-y-6">
                        <div className="h-10 bg-muted animate-pulse rounded w-3/4"></div>
                        <div className="h-6 bg-muted animate-pulse rounded w-1/4"></div>
                        <div className="h-px bg-border w-full my-4"></div>
                        <div className="h-24 bg-muted animate-pulse rounded w-full"></div>
                        <div className="h-12 bg-muted animate-pulse rounded w-1/3"></div>
                        <div className="h-14 bg-muted animate-pulse rounded w-full mt-4"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="container mx-auto flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                <h1 className="text-6xl font-extrabold tracking-tighter mb-4">404</h1>
                <p className="text-xl text-foreground font-medium">Product Not Found</p>
                <p className="mt-4 text-sm text-muted-foreground max-w-md">
                    The minimalist piece you are looking for does not exist or has been removed from our catalog.
                </p>
            </div>
        );
    }

    const maxStock = product.stock ?? 10;
    const isOutOfStock = maxStock === 0;

    const handleAddToCart = () => {
        addItem(product, quantity);
    };

    return (
        <div className="container mx-auto max-w-6xl px-4 py-8 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                {/* Left Column: Image */}
                <div className="w-full">
                    <ProductImage category={product.category} image={product.image} name={product.name} />
                </div>

                {/* Right Column: Details */}
                <div className="flex flex-col">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground mb-4">
                        {product.name}
                    </h1>
                    <p className="text-2xl font-bold text-muted-foreground mb-6">
                        ${product.price.toFixed(2)}
                    </p>

                    <div className="h-px bg-border w-full mb-6"></div>

                    <div className="text-muted-foreground leading-relaxed mb-8 text-lg">
                        <p>
                            Experience the minimalist elegance of our {product.name.toLowerCase()}.
                            Designed with simplicity and utility in mind, this piece perfectly
                            complements the modern {product.category.toLowerCase()} aesthetic.
                            Its unassuming profile makes a quiet yet bold statement in any environment.
                        </p>
                        {maxStock > 0 && maxStock <= 5 && (
                            <p className="text-red-500 font-medium mt-4 text-sm tracking-wide">
                                ONLY {maxStock} LEFT IN STOCK - ORDER SOON.
                            </p>
                        )}
                        {isOutOfStock && (
                            <p className="text-red-500 font-bold mt-4 tracking-wide uppercase">
                                Currently Out of Stock
                            </p>
                        )}
                    </div>

                    <div className="mt-auto space-y-8">
                        <div className="flex flex-col space-y-3">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground pb-2">
                                Quantity
                            </label>
                            <QuantityPicker
                                quantity={quantity}
                                setQuantity={setQuantity}
                                maxStock={maxStock}
                            />
                        </div>

                        <AddToCartButton
                            onClick={handleAddToCart}
                            disabled={isOutOfStock || quantity > maxStock}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
