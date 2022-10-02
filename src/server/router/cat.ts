import { prisma } from "../db/client";
import { TRPCError } from "@trpc/server";
import { createRouter } from "./context";
import { z } from "zod";

export const catRouter = createRouter()
  .query("all", {
    async resolve() {
      return prisma.categories.findMany();
    },
  })
  .query("byId", {
    input: z.object({ id: z.string() }),
    async resolve({ input }) {
      const { id } = input;
      const cat = await prisma.categories.findUnique({
        where: { id },
      });
      if (!cat) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No cat with id '${id}'`,
        });
      }
      return cat;
    },
  })
  .query("byCat", {
    async resolve() {
      return prisma.categories.findMany({ select: { cat: true } })
    }
  })
