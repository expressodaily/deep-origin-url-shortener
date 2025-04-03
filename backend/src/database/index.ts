import mongoose from "mongoose";

import { db } from "../config/config";
import {
  CONNECTION_TIMEOUT_MILLISECONDS,
  SOCKET_TIMEOUT_MILLISECONDS,
} from "./consts";

const dbURI = `mongodb://${db.host}:${db.port}/${db.name}`;

const options = {
  autoIndex: true,
  minPoolSize: db.minPoolSize, 
  maxPoolSize: db.maxPoolSize, 
  connectTimeoutMS: CONNECTION_TIMEOUT_MILLISECONDS, 
  socketTimeoutMS: SOCKET_TIMEOUT_MILLISECONDS, 
};

mongoose.set("strictQuery", true);

mongoose
  .connect(dbURI, options)
  .then(() => {
    console.info("Mongoose connection done");
  })
  .catch((e) => {
    console.info("Mongoose connection error");
    console.error(e);
  });

mongoose.connection.on("connected", () => {
  console.debug("Mongoose default connection open to " + dbURI);
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose default connection error: " + err);
});

mongoose.connection.on("disconnected", () => {
  console.info("Mongoose default connection disconnected");
});

process.on("SIGINT", () => {
  mongoose.connection.close().finally(() => {
    console.info(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

export const connection = mongoose.connection;
