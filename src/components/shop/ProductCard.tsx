"use client";

import { Product } from "@/lib/validations";
import { useCart } from "@/store/useCart";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const addItem = useCart((state) => state.addItem);

    return (
        <div className="group relative flex flex-col gap-2 p-4 transition-subtle hover:bg-muted/50">
            <div className="relative aspect-square w-full overflow-hidden rounded-md bg-muted mb-2">
                {/* Minimalist placeholder for the image */}
                <div className="h-full w-full flex items-center justify-center text-muted-foreground transition-transform duration-500 group-hover:scale-105">
                    {product.category}
                </div>

                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        addItem(product);
                    }}
                    size="icon"
                    className="absolute right-2 top-2 z-10 h-8 w-8 rounded-full opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100"
                >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add to Cart</span>
                </Button>
            </div>

            <div className="flex flex-col space-y-1 mt-auto">
                <h3 className="text-base font-bold tracking-tight text-foreground line-clamp-1">
                    {product.name}
                </h3>
                <p className="text-sm font-medium text-muted-foreground">
                    ${product.price.toFixed(2)}
                </p>
            </div>
        </div>
    );
}
