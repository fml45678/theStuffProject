import { prisma } from "../db/client";
import { TRPCError } from "@trpc/server";
import { createRouter } from "./context";
import { z } from "zod";

export const thingRouter = createRouter()
  .query("all", {
    async resolve() {
      return prisma.items.findMany();
    },
  })
  .query("byId", {
    input: z.object({ id: z.string() }),
    async resolve({ input }) {
      const { id } = input;
      const thing = await prisma.items.findUnique({
        where: { id },
      });
      if (!thing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No thing with sku '${id}'`,
        });
      }
      return thing;
    },
  });
