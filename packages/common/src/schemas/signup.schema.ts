import { z } from "zod";

export const SignupSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().optional(),
  })
  .strict();

export type TSignup = z.infer<typeof SignupSchema>;
