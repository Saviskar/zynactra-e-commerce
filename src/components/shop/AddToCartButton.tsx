import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface AddToCartButtonProps {
    onClick: () => void;
    disabled: boolean;
}

export function AddToCartButton({ onClick, disabled }: AddToCartButtonProps) {
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (isSuccess) {
            timeout = setTimeout(() => setIsSuccess(false), 2000);
        }
        return () => clearTimeout(timeout);
    }, [isSuccess]);

    const handleClick = () => {
        onClick();
        setIsSuccess(true);
    };

    return (
        <Button
            onClick={handleClick}
            disabled={disabled}
            className="w-full h-14 text-lg font-bold bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 shadow-md"
        >
            {isSuccess ? (
                <span className="flex items-center justify-center gap-2">
                    Added to Cart <Check className="h-5 w-5" />
                </span>
            ) : (
                "Add to Cart"
            )}
        </Button>
    );
}
