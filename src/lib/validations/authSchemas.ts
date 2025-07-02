import {z} from "zod";

export const signUpSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Please enter a valid email address"),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long")
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .trim()
    .email("Please enter a valid email address")
    .max(100, "Email is too long"),

  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .trim()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password is too long"),
});