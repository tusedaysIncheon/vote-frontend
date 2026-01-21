import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpSchema, type SignUpFormValues } from "@/lib/zodSchemas/SignUpSchema";

export function useSignUpForm() {
  return useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
      email: "",
      confirmPassword: "",
    },
  })
}