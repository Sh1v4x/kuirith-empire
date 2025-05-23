import { z } from "zod";

export const CreateUserSchema = z.object({
  discordId: z.string(),
  email: z.string().email().optional(),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
