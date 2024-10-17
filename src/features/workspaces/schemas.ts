import { z } from "zod";

export const createWorkSpacesSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});

export const updateWorkSpacesSchema = z.object({
  name: z.string().trim().min(1, "Must be One or more characters").optional(),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});
