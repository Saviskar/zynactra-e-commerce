import { Product } from "./validations";

const MOCK_PRODUCTS: Product[] = [
    { id: "1", name: "Classic White T-Shirt", price: 29.99, category: "Apparel" },
    { id: "2", name: "Minimalist Black Hoodie", price: 79.99, category: "Apparel" },
    { id: "3", name: "Monochrome Sneakers", price: 129.99, category: "Footwear" },
    { id: "4", name: "Leather Tote Bag", price: 199.99, category: "Accessories" },
    { id: "5", name: "Matte Black Watch", price: 249.99, category: "Accessories" },
    { id: "6", name: "White Desk Lamp", price: 89.99, category: "Home" },
    { id: "7", name: "Ceramic Coffee Mug", price: 24.99, category: "Home" },
    { id: "8", name: "Essential Notebook", price: 14.99, category: "Office" },
    { id: "9", name: "Stainless Steel Bottle", price: 34.99, category: "Accessories" },
    { id: "10", name: "Cotton Crew Socks", price: 12.99, category: "Apparel" },
];

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const fetchProducts = async (): Promise<Product[]> => {
    await delay(1000); // Simulate network latency
    return MOCK_PRODUCTS;
};

export const placeOrder = async (data: { items: any[]; total: number }) => {
    await delay(2000); // Simulate processing payment
    if (Math.random() < 0.1) {
        throw new Error("Payment failed. Please try again.");
    }
    return { success: true, orderId: `ORD-${Math.floor(Math.random() * 10000)}` };
};
