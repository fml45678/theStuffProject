import z from "zod";

export const createCatOneSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const createCatOneOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type createCatOneInput = z.TypeOf<typeof createCatOneSchema>;
