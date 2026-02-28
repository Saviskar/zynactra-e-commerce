import Link from "next/link";
import { FC, ReactNode } from "react";

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
            <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
                    <div className="flex items-center gap-6">
                        <Link href="/admin/products" className="text-xl font-bold tracking-tight">
                            Admin Dashboard
                        </Link>
                        <nav className="hidden md:flex gap-6">
                            <Link
                                href="/admin/products"
                                className="text-sm font-medium text-neutral-600 hover:text-black transition-colors"
                            >
                                Products
                            </Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="text-sm font-medium px-4 py-2 border rounded-md hover:bg-neutral-100 transition-colors"
                        >
                            Back to Store
                        </Link>
                    </div>
                </div>
            </header>
            <main className="flex-1 container mx-auto px-4 py-8 md:px-8">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
