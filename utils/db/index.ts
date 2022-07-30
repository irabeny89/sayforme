import mongoose, { connect } from "mongoose";
import { envVariables } from "config";

const { dbAtlasVercel, dbCompass } = envVariables,
  dbUri = dbCompass || dbAtlasVercel;

export default async function dbConnection() {
  if (mongoose.connections[0].readyState !== 1) {
    mongoose.set("debug", process.env.NODE_ENV === "development");
    await connect(dbUri);
  }
}

mongoose.connection.once("open", () =>
  console.log("Database connected: %s", dbCompass || dbAtlasVercel)
);
