"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/lib/api-client";
import ProductForm from "../../new/ProductForm";
import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const { data: product, isLoading, error } = useQuery({
        queryKey: ["admin-product", resolvedParams.id],
        queryFn: () => fetchProductById(resolvedParams.id),
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-r-neutral-900" />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-white border border-dashed rounded-lg">
                <h3 className="text-lg font-medium text-neutral-900 mb-2">Product Not Found</h3>
                <p className="text-sm text-neutral-500 mb-6">The product you are trying to edit does not exist or has been removed.</p>
                <Link href="/admin/products" className="text-sm font-medium text-neutral-900 hover:underline">
                    &larr; Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-4">
                <Link href="/admin/products" className="p-2 -ml-2 rounded-md hover:bg-neutral-100 transition-colors text-neutral-500">
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Back to Products</span>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                        Make changes to the product details below.
                    </p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg border shadow-sm">
                <ProductForm initialData={product} isEditing={true} />
            </div>
        </div>
    );
}
