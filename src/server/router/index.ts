// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { postRouter } from "./post";
import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";
import { thingRouter } from "./thing";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("post.", postRouter)
  .merge("thing.", thingRouter)
  .merge("auth.", protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
