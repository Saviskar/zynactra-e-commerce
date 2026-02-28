import { Product } from "./validations";

let MOCK_PRODUCTS: Product[] = [
    { id: "1", name: "Classic White T-Shirt", price: 29.99, category: "Apparel", stock: 10, image: "/images/tee.webp" },
    { id: "2", name: "Minimalist Black Hoodie", price: 79.99, category: "Apparel", stock: 5, image: "/images/hoodie.jpg" },
    { id: "3", name: "Monochrome Sneakers", price: 129.99, category: "Footwear", stock: 8, image: "/images/sneakers.webp" },
    { id: "4", name: "Leather Tote Bag", price: 199.99, category: "Accessories", stock: 3, image: "/images/totebag.jpg" },
    { id: "5", name: "Matte Black Watch", price: 249.99, category: "Accessories", stock: 15, image: "/images/watch.jpg" },
    { id: "6", name: "White Desk Lamp", price: 89.99, category: "Home", stock: 7, image: "/images/lamp.jpg" },
    { id: "7", name: "Ceramic Coffee Mug", price: 24.99, category: "Home", stock: 20, image: "/images/mug.jpg" },
    { id: "8", name: "Essential Notebook", price: 14.99, category: "Office", stock: 12, image: "/images/notebook.webp" },
    { id: "9", name: "Stainless Steel Bottle", price: 34.99, category: "Accessories", stock: 9, image: "/images/bottle.jpg" },
    { id: "10", name: "Cotton Crew Socks", price: 12.99, category: "Apparel", stock: 25, image: "/images/socks.jpg" },
];

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const fetchProducts = async (): Promise<Product[]> => {
    await delay(1000); // Simulate network latency
    return MOCK_PRODUCTS;
};

export const fetchProductById = async (id: string): Promise<Product> => {
    await delay(1000);
    const product = MOCK_PRODUCTS.find((p) => p.id === id);
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
};

export const createProduct = async (data: Omit<Product, 'id'>): Promise<Product> => {
    await delay(1000);
    const newProduct: Product = {
        ...data,
        id: Math.random().toString(36).substring(2, 9),
    };
    MOCK_PRODUCTS.push(newProduct);
    return newProduct;
};

export const placeOrder = async (data: { items: any[]; total: number }) => {
    await delay(2000); // Simulate processing payment
    if (Math.random() < 0.1) {
        throw new Error("Payment failed. Please try again.");
    }
    return { success: true, orderId: `ORD-${Math.floor(Math.random() * 10000)}` };
};
