import { validators } from "utils";
import { z } from "zod";

export const registerSchemas = z.object({
  firstName: validators.textBox("input.firstName.label"),
  lastName: validators.textBox("input.lastName.label"),
  phone: validators.textBox("input.phone.label"),
  email: validators.email(),
  password: validators.password(),
});

export type RegisterFormValues = z.infer<typeof registerSchemas>;
