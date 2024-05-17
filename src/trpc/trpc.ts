import { User } from "@/payload-types";
import { ExpressContext } from "@/server";
import { TRPCError, initTRPC } from "@trpc/server";
import { PayloadRequest } from "payload/types";

const t = initTRPC.context<ExpressContext>().create();
const middleware = t.middleware;

// middleware - isAuth
const isAuth = middleware(async ({ ctx, next }) => {
  const req = ctx.req as PayloadRequest; //user attached to the request

  const { user } = req as { user: User | null };

  // should be logged in to continue for payment - so check user
  if (!user || !user.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
