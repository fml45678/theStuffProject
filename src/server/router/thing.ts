import { prisma } from "../db/client";
import { TRPCError } from "@trpc/server";
import { createRouter } from "./context";
import { z } from "zod";
import {
  createCatOneOutputSchema,
  createCatOneSchema,
} from "../../schema/catOne.schema";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPC_ERROR_CODES_BY_KEY } from "@trpc/server/rpc";
import { trpc } from "../../utils/trpc";

export const thingRouter = createRouter()
  .query("all", {
    async resolve() {
      return prisma.items.findMany();
    },
  })
  .query("allCats", {
    async resolve() {
      return prisma.catOne.findMany();
    },
  })
  .mutation("addItem", {
    input: createCatOneSchema,
    // output: createCatOneOutputSchema,
    async resolve({ ctx, input }) {
      const { id, name } = input;

      try {
        const catOne = await ctx.prisma.catOne.create({
          data: {
            id,
            name,
          },
        });
        return catOne;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            throw new TRPCError({
              code: "CONFLICT",
              message: "ID already exists",
            });
          }
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
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
          message: `No thing with id '${id}'`,
        });
      }
      return thing;
    },
  });
