"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
    search: string;
    onSearchChange: (val: string) => void;
    category: string;
    onCategoryChange: (val: string) => void;
    categories: string[];
}

export default function FilterBar({
    search,
    onSearchChange,
    category,
    onCategoryChange,
    categories,
}: FilterBarProps) {
    return (
        <div className="sticky top-16 z-30 flex flex-col gap-4 border-b border-border bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-sm flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-9"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                {categories.map((c) => (
                    <Button
                        key={c}
                        variant={category === c ? "default" : "ghost"}
                        size="sm"
                        onClick={() => onCategoryChange(c)}
                        className="rounded-full whitespace-nowrap"
                    >
                        {c}
                    </Button>
                ))}
                <div className="ml-auto sm:ml-2 border-l border-border pl-2 border-l-border">
                    <Button variant="outline" size="sm" className="gap-2">
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                    </Button>
                </div>
            </div>
        </div>
    );
}
