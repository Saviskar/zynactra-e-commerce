"use client";

import { Product } from "@/lib/validations";
import { useCart } from "@/store/useCart";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const addItem = useCart((state) => state.addItem);

    return (
        <div className="group relative flex flex-col gap-2 p-4 transition-subtle hover:bg-muted/50">
            <div className="aspect-square w-full overflow-hidden rounded-md bg-muted mb-2">
                {/* Minimalist placeholder for the image */}
                <div className="h-full w-full flex items-center justify-center text-muted-foreground transition-transform duration-500 group-hover:scale-105">
                    {product.category}
                </div>
            </div>

            <div className="flex flex-col space-y-1">
                <h3 className="text-base font-bold tracking-tight text-foreground line-clamp-1">
                    {product.name}
                </h3>
                <p className="text-sm font-medium text-muted-foreground">
                    ${product.price.toFixed(2)}
                </p>
            </div>

            <div className="mt-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:absolute sm:bottom-4 sm:left-4 sm:right-4 sm:mt-0">
                <Button
                    onClick={() => addItem(product)}
                    className="w-full"
                    variant="outline"
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    );
}
