// Self host - entery point

import express from "express";
import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./next.utils";

const app = express();
const PORT = Number(process.env.PORT) || 3000; // constant that does not change hence all CAPS , process.env.PORT is string - hence converting it to number

// Function to start server
const start = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
      },
    },
  }); //get database access

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
