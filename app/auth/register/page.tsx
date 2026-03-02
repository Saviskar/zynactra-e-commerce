import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8 rounded-lg border border-border bg-background p-8 shadow-sm">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your details nicely formatted.
                    </p>
                </div>

                <RegisterForm />

                <div className="text-center text-sm mt-6">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="font-medium underline underline-offset-4 hover:text-muted-foreground">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}
