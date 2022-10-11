import z from "zod";

export const createItemsSchema = z.object({
  id: z.string(),
  description: z.string(),
  manufacturer: z.string(),
  condition: z.string(),
  notes: z.string(),
  sale: z.boolean(),
  value: z.number(),
  sold: z.boolean(),
});

export const createItemsOutputSchema = z.object({
  id: z.string(),
  description: z.string(),
  manufacturer: z.string(),
  condition: z.string(),
  notes: z.string(),
  sale: z.boolean(),
  value: z.number(),
  sold: z.boolean(),
});

export type createItemsInput = z.infer<typeof createItemsSchema>;
