import mongoose, { connect } from "mongoose";
import { envVariables } from "config";

export default async function dbConnection() {
  if (mongoose.connections[0].readyState !== 1) {
    mongoose.set("debug", process.env.NODE_ENV === "development");
    await connect(envVariables.dbCompass);
  }
}

mongoose.connection.once("open", () =>
  console.log("Database connected: %s", envVariables.dbCompass)
);
