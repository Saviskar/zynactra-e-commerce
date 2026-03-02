import { Product, apiProductSchema } from "./validations";
import { z } from "zod";

const INITIAL_PRODUCTS: Product[] = [
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

const getProducts = (): Product[] => {
    if (typeof window === "undefined") return INITIAL_PRODUCTS;
    const stored = localStorage.getItem("demo_products");
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            return INITIAL_PRODUCTS;
        }
    }
    localStorage.setItem("demo_products", JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
};

const saveProducts = (products: Product[]) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("demo_products", JSON.stringify(products));
    }
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const fetchProducts = async (params?: { search?: string; category?: string }): Promise<Product[]> => {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append("search", params.search);
    if (params?.category && params.category !== "All") queryParams.append("category", params.category);

    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
    const response = await fetch(`${API_BASE_URL}/products${queryString}`);

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    const responseData = await response.json();
    const data = responseData.data || responseData;

    const parsed = z.array(apiProductSchema).parse(data);

    return parsed.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description || "",
        price: p.unit_price,
        category: p.category_name || "Uncategorized",
        stock: p.stock_qty,
        image: p.image_url || "/images/tee.webp",
    }));
};

export const fetchProductById = async (id: string): Promise<Product> => {
    await delay(1000);
    const products = getProducts();
    const product = products.find((p) => p.id === id);
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
};

export const createProduct = async (data: Omit<Product, 'id'>): Promise<Product> => {
    await delay(1000);
    const products = getProducts();
    const newProduct: Product = {
        ...data,
        id: Math.random().toString(36).substring(2, 9),
    };
    products.push(newProduct);
    saveProducts(products);
    return newProduct;
};

export const updateProduct = async (id: string, data: Partial<Product>): Promise<Product> => {
    await delay(1000);
    const products = getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
        throw new Error("Product not found");
    }
    const updatedProduct = { ...products[index], ...data };
    products[index] = updatedProduct;
    saveProducts(products);
    return updatedProduct;
};

export const deleteProduct = async (id: string): Promise<boolean> => {
    await delay(1000);
    const products = getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
        throw new Error("Product not found");
    }
    products.splice(index, 1);
    saveProducts(products);
    return true;
};

export const placeOrder = async (data: { items: any[]; total: number; token: string }) => {
    const payload = {
        items: data.items.map(item => ({
            product_id: parseInt(item.product.id),
            quantity: item.quantity
        }))
    };

    const response = await fetch(`${API_BASE_URL}/orders/checkout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${data.token}`
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        let errorMessage = "Checkout failed";
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch (e) {
            // failed to parse json
        }
        throw new Error(errorMessage);
    }

    return response.json();
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const registerUser = async (data: any) => {
    const payload = {
        email: data.email,
        password: data.password
    };
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        let errorMessage = "Registration failed";
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch (e) {
            // failed to parse json
        }
        throw new Error(errorMessage);
    }

    const responseData = await response.json();
    return responseData.data || responseData;
};
