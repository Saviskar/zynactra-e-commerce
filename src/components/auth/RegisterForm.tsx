"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRegister } from "@/lib/hooks/useRegister";
import { Check, X, Loader2 } from "lucide-react";

export function RegisterForm() {
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const { mutate, isPending } = useRegister();

    const password = watch("password", "");
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    const onSubmit = (data: RegisterFormData) => {
        mutate(data, {
            onError: (error) => {
                setError("root", { message: error.message });
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
                {errors.root && (
                    <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 rounded-md">
                        {errors.root.message}
                    </div>
                )}

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
                        placeholder="••••••••"
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
                        placeholder="••••••••"
                        {...register("confirmPassword")}
                        className={errors.confirmPassword ? "border-red-500" : ""}
                    />
                    {errors.confirmPassword && (
                        <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
                    )}
                </div>
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                    </>
                ) : (
                    "Sign Up"
                )}
            </Button>
        </form>
    );
}
