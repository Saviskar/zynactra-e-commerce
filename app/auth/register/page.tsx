"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, X } from "lucide-react";

export default function RegisterPage() {
    const { login } = useAuth();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const password = watch("password", "");
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    const onSubmit = async (data: RegisterFormData) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        login({ fullName: data.fullName, email: data.email });
        router.push("/");
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8 rounded-lg border border-border bg-background p-8 shadow-sm">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your details perfectly aligned.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="fullName" className="text-sm font-medium leading-none">
                                Full Name
                            </label>
                            <Input
                                id="fullName"
                                placeholder="John Doe"
                                {...register("fullName")}
                                className={errors.fullName ? "border-red-500" : ""}
                            />
                            {errors.fullName && (
                                <p className="text-xs text-red-500">{errors.fullName.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                {...register("email")}
                                className={errors.email ? "border-red-500" : ""}
                            />
                            {errors.email && (
                                <p className="text-xs text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium leading-none">
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                {...register("password")}
                                className={errors.password ? "border-red-500" : ""}
                            />

                            <div className="mt-2 space-y-1 text-xs">
                                <div className={`flex items-center gap-2 ${hasMinLength ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}>
                                    {hasMinLength ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                                    At least 8 characters
                                </div>
                                <div className={`flex items-center gap-2 ${hasUppercase ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}>
                                    {hasUppercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                                    One uppercase letter
                                </div>
                                <div className={`flex items-center gap-2 ${hasNumber ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}>
                                    {hasNumber ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                                    One number
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="text-sm font-medium leading-none">
                                Confirm Password
                            </label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                {...register("confirmPassword")}
                                className={errors.confirmPassword ? "border-red-500" : ""}
                            />
                            {errors.confirmPassword && (
                                <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
                            )}
                        </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Creating account..." : "Sign Up"}
                    </Button>
                </form>

                <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="font-medium underline underline-offset-4 hover:text-muted-foreground">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}
