"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api-client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, PackageX } from "lucide-react";

export default function AdminProductsList() {
    const { data: products, isLoading, error } = useQuery({
        queryKey: ["admin-products"],
        queryFn: fetchProducts,
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-r-neutral-900" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center py-20 text-red-500">
                Failed to load products. Please try again.
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 border rounded-lg bg-white border-dashed">
                <PackageX className="h-12 w-12 text-neutral-300 mb-4" />
                <h3 className="text-lg font-medium text-neutral-900">No products found</h3>
                <p className="text-sm text-neutral-500 mb-6">Get started by creating a new product.</p>
                <Link href="/admin/products/new">
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add New Product
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-end">
                <Link href="/admin/products/new">
                    <Button className="gap-2 bg-neutral-900 text-white hover:bg-neutral-800">
                        <Plus className="h-4 w-4" />
                        Add New Product
                    </Button>
                </Link>
            </div>

            <div className="rounded-lg border bg-white overflow-hidden shadow-sm">
                <div className="grid grid-cols-[80px_1fr_120px_120px] items-center gap-4 p-4 border-b bg-neutral-50/50 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    <div>Image</div>
                    <div>Name</div>
                    <div>Price</div>
                    <div>Stock</div>
                </div>
                <div className="divide-y">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="grid grid-cols-[80px_1fr_120px_120px] items-center gap-4 p-4 hover:bg-neutral-50 transition-colors"
                        >
                            <div className="relative h-14 w-14 rounded-md overflow-hidden bg-neutral-100 border flex items-center justify-center">
                                {product.image ? (
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <span className="text-[10px] text-neutral-400">No Img</span>
                                )}
                            </div>
                            <div className="font-medium text-neutral-900 line-clamp-1 pr-4">
                                {product.name}
                            </div>
                            <div className="text-neutral-600 font-mono text-sm">
                                ${product.price.toFixed(2)}
                            </div>
                            <div>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${(product.stock ?? 0) > 10
                                        ? "bg-green-100 text-green-800"
                                        : (product.stock ?? 0) > 0
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-red-100 text-red-800"
                                    }`}>
                                    {product.stock ?? 0} {product.stock === 1 ? 'item' : 'items'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
