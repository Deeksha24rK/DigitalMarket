// Self host - entery point

import express from "express";
import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./next.utils";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";
import { inferAsyncReturnType } from "@trpc/server";
import bodyParser from "body-parser";
import { IncomingMessage } from "http";
import { stripeWebhookHandler } from "./webhooks";

const app = express();
const PORT = Number(process.env.PORT) || 3000; // constant that does not change hence all CAPS , process.env.PORT is string - hence converting it to number

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({ req, res });

export type ExpressContext = inferAsyncReturnType<typeof createContext>;

//to check if message actually comes from stripe
export type WebhookRequest = IncomingMessage & { rawBody: Buffer };
// Function to start server
const start = async () => {
  //modify message stripe sends us
  const webhookMiddleware = bodyParser.json({
    verify: (req: WebhookRequest, _, buffer) => {
      req.rawBody = buffer;
    },
  });

  app.post("/api/webhooks/stripe", webhookMiddleware, stripeWebhookHandler);

  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
      },
    },
  }); //get database access

  // when we get a request to this endpoint we need to forward it to trpc in nextjs
  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // app.use - Express middleware , forward it to nextHandler
  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload.logger.info("Next.js started"); //print on console just for us
    app.listen(PORT, async () => {
      payload.logger.info(
        `Next.js App URL : ${process.env.NEXT_PUBLIC_SERVER_URL}`
      );
    });
  });
};

start();
