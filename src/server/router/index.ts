// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";
import { thingRouter } from "./thing";
import { catRouter } from "./cat";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("cat.", catRouter)
  .merge("thing.", thingRouter)
  .merge("auth.", protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
