// Seperarte API endpoint that handles authentication logic

// Backend
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getPayloadClient } from "../get-payload";
import { AuthCredentialsValidator } from "../lib/validators/account-credentials-validator";
import { publicProcedure, router } from "./trpc";

export const authRouter = router({
  // Sign-up endpoint
  // create user inside of CMS
  // publicProcedure - Signup endpoint is public , anyone should be able to call it
  createPayloadUser: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      const { email, password } = input;
      const payload = await getPayloadClient();

      // Check if user already exists
      const { docs: users } = await payload.find({
        collection: "users",
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (users.length !== 0) throw new TRPCError({ code: "CONFLICT" });

      // if user does not exist, create user
      await payload.create({
        collection: "users",
        data: {
          email,
          password,
          role: "user",
        },
      });

      return { success: true, sentToEmail: email };
    }),

  // verify email endpoint - that lets us validate user email
  // publicProcedure - Signup endpoint is public , anyone should be able to call it
  VerifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    // we can destructure input in mutation as we have add it above
    // .query since we are reading data
    .query(async ({ input }) => {
      const { token } = input;

      const payload = await getPayloadClient(); //access to CMS

      // logic
      const isVerified = await payload.verifyEmail({
        collection: "users",
        token,
      });

      if (!isVerified) throw new TRPCError({ code: "UNAUTHORIZED" });

      return { success: true };
    }),

  // Sign-in endpoint
  signIn: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { res } = ctx;
      const payload = await getPayloadClient(); //access to CMS

      try {
        await payload.login({
          collection: "users",
          data: {
            email,
            password,
          },
          res,
        });

        return { success: true };
      } catch (error) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }),
});
