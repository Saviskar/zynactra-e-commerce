"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema, CreateProductFormData } from "@/lib/validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProductForm() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { register, handleSubmit, formState: { errors } } = useForm<CreateProductFormData>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            category: "Apparel",
            stock: 0,
            image: ""
        }
    });

    const mutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-products"] });
            router.push("/admin/products");
        },
    });

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

                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none" htmlFor="image">Image URL</label>
                    <Input id="image" {...register("image")} placeholder="/images/default.jpg" />
                    {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
                </div>
            </div>

            <div className="flex gap-4 pt-4 border-t">
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
                    disabled={mutation.isPending}
                    className="flex-1 bg-neutral-900 text-white hover:bg-neutral-800"
                >
                    {mutation.isPending ? "Saving..." : "Create Product"}
                </Button>
            </div>
        </form>
    );
}
