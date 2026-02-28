import React from 'react';

export function ProductImage({ category }: { category: string }) {
    return (
        <div className="relative aspect-square w-full overflow-hidden rounded-md bg-muted flex items-center justify-center text-muted-foreground text-2xl font-medium uppercase tracking-widest shadow-sm">
            {category}
        </div>
    );
}
