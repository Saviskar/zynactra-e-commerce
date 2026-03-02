import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api-client";
import { RegisterFormData } from "../validations";
import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";

export const useRegister = () => {
    const { login } = useAuth();
    const router = useRouter();

    return useMutation({
        mutationFn: (data: RegisterFormData) => registerUser(data),
        onSuccess: (data, variables) => {
            // Provide a fallback in case backend only returns token but not the user details properly
            const userResponse = data.user || { email: variables.email, fullName: variables.fullName };
            // Set the full name from the variables since backend might drop it
            login({ fullName: variables.fullName, email: userResponse.email || variables.email });
            router.push("/");
        },
    });
};
