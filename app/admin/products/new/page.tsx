import ProductForm from "./ProductForm";

export const metadata = {
    title: "Admin - New Product",
};

export default function NewProductPage() {
    return (
        <div className="flex flex-col gap-8 max-w-2xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
                <p className="text-muted-foreground mt-1 text-sm">
                    Create a new product by filling out the details below.
                </p>
            </div>
            <div className="bg-white p-6 rounded-lg border shadow-sm">
                <ProductForm />
            </div>
        </div>
    );
}
