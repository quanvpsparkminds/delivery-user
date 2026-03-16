import { validators } from "utils";
import { z } from "zod";

export const loginSchema = z.object({
  username: validators.inputRequired("input.login.label"),
  password: validators.password(),
});

export const signupSchema = z.object({
  fullName: z.string().min(1, { message: "errorMessage.input.required" }),
  email: z
    .string()
    .min(1, { message: "errorMessage.input.required" })
    .email({ message: "errorMessage.input.invalid" }),
  password: z.string().min(1, { message: "errorMessage.input.required" }),
  checkTerm: z.boolean().refine((val) => val),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignUpFormValues = z.infer<typeof signupSchema>;
