import AdminProductsList from "./AdminProductsList";

export const metadata = {
    title: "Admin - Products",
};

export default function AdminProductsPage() {
    return (
        <div className="flex flex-col gap-8 max-w-5xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                <p className="text-muted-foreground mt-1 text-sm">
                    Manage your store's inventory and product details.
                </p>
            </div>
            <AdminProductsList />
        </div>
    );
}
