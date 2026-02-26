"use client";

import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api-client";
import FilterBar from "@/components/shop/FilterBar";
import ProductCard from "@/components/shop/ProductCard";

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const { data: products } = useSuspenseQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filteredProducts = products.filter((p) => {
    const matchesCategory = category === "All" || p.category === category;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col flex-1">
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
      />
      <div className="container mx-auto px-4 py-8 sm:px-6">
        {filteredProducts.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center text-center">
            <h2 className="text-xl font-medium">No products found</h2>
            <p className="mt-2 text-muted-foreground">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
