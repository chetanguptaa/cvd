import { z } from "zod";

export const CreateGuestSchema = z.object({
  name: z.string(),
});

export type TCreateGuest = z.infer<typeof CreateGuestSchema>;
