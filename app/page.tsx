"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api-client";
import FilterBar from "@/components/shop/FilterBar";
import ProductCard from "@/components/shop/ProductCard";

function ProductSkeleton() {
  return (
    <div className="group relative flex flex-col space-y-4">
      <div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-secondary/80 animate-pulse" />
      <div className="flex flex-col space-y-2">
        <div className="h-4 w-3/4 rounded bg-secondary/80 animate-pulse" />
        <div className="h-4 w-1/4 rounded bg-secondary/80 animate-pulse" />
      </div>
    </div>
  );
}

function ErrorState({ retry }: { retry: () => void }) {
  return (
    <div className="flex flex-col flex-1 h-64 items-center justify-center text-center">
      <h2 className="text-xl font-medium tracking-tight">Failed to load products</h2>
      <p className="mt-2 mb-6 text-muted-foreground">
        We encountered an error while communicating with our servers.
      </p>
      <button
        onClick={retry}
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
      >
        Retry
      </button>
    </div>
  );
}

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const { data: products, isLoading, isError, refetch } = useQuery({
    queryKey: ["products", { search, category }],
    queryFn: () => fetchProducts({ search, category }),
    staleTime: 5 * 60 * 1000,
  });

  const { data: allProductsForCategories } = useQuery({
    queryKey: ["products", { search: "", category: "All" }],
    queryFn: () => fetchProducts({ search: "", category: "All" }),
    staleTime: 5 * 60 * 1000,
  });

  const categories = allProductsForCategories
    ? ["All", ...Array.from(new Set(allProductsForCategories.map((p) => p.category))).filter(c => c !== "All")]
    : ["All"];

  return (
    <div className="flex flex-col flex-1">
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
      />
      <div className="container mx-auto px-4 py-8 sm:px-6 flex-1">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <ErrorState retry={() => refetch()} />
        ) : !products || products.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center text-center">
            <h2 className="text-xl font-medium">No products found</h2>
            <p className="mt-2 text-muted-foreground">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
