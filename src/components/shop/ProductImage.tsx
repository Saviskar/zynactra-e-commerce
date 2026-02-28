import React from 'react';
import Image from 'next/image';

interface ProductImageProps {
    category: string;
    image?: string;
    name?: string;
}

export function ProductImage({ category, image, name }: ProductImageProps) {
    return (
        <div className="relative aspect-square w-full overflow-hidden rounded-md bg-muted flex items-center justify-center text-muted-foreground text-2xl font-medium uppercase tracking-widest shadow-sm">
            {image ? (
                <Image
                    src={image}
                    alt={name || category}
                    fill
                    className="object-cover"
                    priority
                />
            ) : (
                category
            )}
        </div>
    );
}
