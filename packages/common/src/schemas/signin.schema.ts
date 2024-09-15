import { z } from "zod";

export const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type TSignin = z.infer<typeof SigninSchema>;
