import { validators } from "utils";
import { z } from "zod";

export const authSchemas = z.object({
  email: validators.email(),
  password: validators.password(),
});

export type AuthFormValues = z.infer<typeof authSchemas>;
