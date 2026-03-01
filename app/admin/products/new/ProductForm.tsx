"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema, CreateProductFormData } from "@/lib/validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, updateProduct, deleteProduct } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Product } from "@/lib/validations";
import Image from "next/image";

interface ProductFormProps {
    initialData?: Product;
    isEditing?: boolean;
}

export default function ProductForm({ initialData, isEditing = false }: ProductFormProps) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [isUploading, setIsUploading] = useState(false);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<CreateProductFormData>({
        resolver: zodResolver(createProductSchema),
        defaultValues: initialData || {
            name: "",
            description: "",
            price: 0,
            category: "Apparel",
            stock: 0,
            image: ""
        }
    });

    const currentImage = watch("image");

    const mutation = useMutation({
        mutationFn: async (data: CreateProductFormData) => {
            if (isEditing && initialData) {
                return updateProduct(initialData.id, data);
            }
            return createProduct(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-products"] });
            router.push("/admin/products");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            return deleteProduct(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-products"] });
            router.push("/admin/products");
        },
    });

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this product?")) {
            if (initialData?.id) {
                deleteMutation.mutate(initialData.id);
            }
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Upload failed");
            }

            const data = await response.json();
            setValue("image", data.url, { shouldValidate: true });
        } catch (error) {
            console.error("Error uploading image:", error);
            // You might want to show a toast error here
        } finally {
            setIsUploading(false);
        }
    };

    const onSubmit = (data: CreateProductFormData) => {
        mutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-medium leading-none" htmlFor="name">Product Name *</label>
                <Input id="name" {...register("name")} placeholder="e.g. Minimalist Black Hoodie" />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium leading-none" htmlFor="description">Description</label>
                <textarea
                    id="description"
                    {...register("description")}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Describe the product..."
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none" htmlFor="price">Price ($) *</label>
                    <Input id="price" type="number" step="0.01" {...register("price", { valueAsNumber: true })} />
                    {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none" htmlFor="stock">Stock Quantity</label>
                    <Input id="stock" type="number" {...register("stock", { valueAsNumber: true })} />
                    {errors.stock && <p className="text-sm text-red-500">{errors.stock.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none" htmlFor="category">Category *</label>
                    <Input id="category" {...register("category")} placeholder="e.g. Apparel" />
                    {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
                </div>

                <div className="space-y-4">
                    <label className="text-sm font-medium leading-none" htmlFor="image-upload">Product Image</label>
                    <div className="flex items-start gap-4">
                        {currentImage ? (
                            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border bg-neutral-100">
                                <Image
                                    src={currentImage}
                                    alt="Product preview"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-md border border-dashed bg-neutral-50">
                                <span className="text-xs text-neutral-500">No image</span>
                            </div>
                        )}
                        <div className="flex flex-col gap-2 flex-grow">
                            <Input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={isUploading}
                                className="cursor-pointer"
                            />
                            {/* Hidden input to register the image URL with react-hook-form */}
                            <input type="hidden" {...register("image")} />
                            {isUploading && <p className="text-xs text-blue-500 animate-pulse">Uploading image...</p>}
                            {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
                            <p className="text-xs text-muted-foreground mt-1 text-neutral-500">
                                Recommended: Square image, max 2MB.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 pt-4 border-t">
                {isEditing && (
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={deleteMutation.isPending || mutation.isPending || isUploading}
                        className="bg-red-500 hover:bg-red-600 text-white"
                    >
                        {deleteMutation.isPending ? "Deleting..." : "Delete Product"}
                    </Button>
                )}
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex-1"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={mutation.isPending || isUploading || deleteMutation.isPending}
                    className="flex-1 bg-neutral-900 text-white hover:bg-neutral-800"
                >
                    {mutation.isPending || isUploading ? "Saving..." : (isEditing ? "Update Product" : "Create Product")}
                </Button>
            </div>
        </form>
    );
}
