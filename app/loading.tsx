import { Suspense } from "react";
import ShopPage from "./page";

export default function Loading() {
    return (
        <div className="flex flex-col flex-1">
            <div className="sticky top-16 z-30 flex h-16 w-full items-center border-b border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="h-9 w-64 animate-pulse rounded-md bg-muted"></div>
                <div className="hidden h-9 w-96 animate-pulse gap-2 rounded-md bg-muted sm:flex"></div>
            </div>
            <div className="container mx-auto px-4 py-8 sm:px-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-2 p-4">
                            <div className="aspect-square w-full animate-pulse rounded-md bg-muted mb-2"></div>
                            <div className="h-5 w-3/4 animate-pulse rounded bg-muted"></div>
                            <div className="h-4 w-1/4 animate-pulse rounded bg-muted"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
