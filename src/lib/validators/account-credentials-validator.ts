import { z } from "zod"; //schema validation library

export const AuthCredentialsValidator = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(8, { message: " Password must be at least 8 characters long." }),
});

export type TAuthCredentialsValidator = z.infer<
  typeof AuthCredentialsValidator
>;
