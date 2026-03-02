import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  category: z.string(),
  image: z.string().optional(),
  stock: z.number().optional(),
});

export const apiProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  unit_price: z.union([z.number(), z.string()]).transform((val) => Number(val)),
  stock_qty: z.number(),
  category_name: z.string().nullable().optional(),
  image_url: z.string().nullable().optional(),
});

export type Product = z.infer<typeof productSchema>;

export const createProductSchema = productSchema.omit({ id: true });

export type CreateProductFormData = z.infer<typeof createProductSchema>;

export const cartItemSchema = z.object({
  product: productSchema,
  quantity: z.number().min(1),
});

export type CartItem = z.infer<typeof cartItemSchema>;
