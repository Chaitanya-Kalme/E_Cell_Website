import z from "zod";



export const signInSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(5,"Password must be atleast of 5 characters")
})

export const registrationSchema = z.object({
    userName: z
    .string()
    .min(3,"UserName must be atleast 3 characters")
    .max(20,"UserName must be less than 20 characters"),
    password: z
    .string()
    .min(7,"Password must be atleast of 7 characters")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
    mobileNo: z.string().regex(/^\d{10}$/, "Mobile number must be exactly 10 digits and contain only numbers"),
    email: z.email("Invalid email address")
    
})