import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";

interface QuantityPickerProps {
    quantity: number;
    setQuantity: (val: number) => void;
    maxStock: number;
}

export function QuantityPicker({ quantity, setQuantity, maxStock }: QuantityPickerProps) {
    const handleDecrement = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };
    const handleIncrement = () => {
        if (quantity < maxStock && quantity < 10) setQuantity(quantity + 1);
    };

    return (
        <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={handleDecrement} disabled={quantity <= 1}>
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease quantity</span>
            </Button>
            <Input
                type="number"
                readOnly
                value={quantity}
                onChange={() => { }} // readonly, controlled via buttons
                className="w-16 text-center font-medium"
            />
            <Button variant="outline" size="icon" onClick={handleIncrement} disabled={quantity >= maxStock || quantity >= 10}>
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase quantity</span>
            </Button>
        </div>
    );
}
