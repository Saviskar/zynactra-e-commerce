"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [globalError, setGlobalError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setGlobalError("");
        try {
            // Simulate API call
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (data.email === "fail@example.com") reject(new Error("Invalid credentials"));
                    resolve(true);
                }, 1000);
            });

            login({ fullName: "Test User", email: data.email });
            router.push("/");
        } catch (err: any) {
            setGlobalError(err.message || "Something went wrong.");
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
            <div className="w-full max-w-sm space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your credentials to access your account.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
                    {globalError && (
                        <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-md border border-red-500/20">
                            {globalError}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                {...register("email")}
                                className={errors.email ? "border-red-500" : ""}
                            />
                            {errors.email && (
                                <p className="text-xs text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-sm font-medium leading-none">
                                    Password
                                </label>
                                <Link href="#" className="text-xs font-medium text-muted-foreground hover:text-foreground">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                {...register("password")}
                                className={errors.password ? "border-red-500" : ""}
                            />
                            {errors.password && (
                                <p className="text-xs text-red-500">{errors.password.message}</p>
                            )}
                        </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Signing in..." : "Sign In"}
                    </Button>
                </form>

                <div className="text-center text-sm mt-6">
                    Do not have an account?{" "}
                    <Link href="/auth/register" className="font-medium underline underline-offset-4 hover:text-muted-foreground">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
