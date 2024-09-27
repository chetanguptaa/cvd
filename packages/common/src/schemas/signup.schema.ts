import { z } from "zod";

export const SignupSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string(),
  })
  .strict();

export type TSignup = z.infer<typeof SignupSchema>;
