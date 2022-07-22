import mongoose, { connect } from "mongoose";

const dbUrl = process.env.DB_COMPASS!;

export default async function dbConnection() {
  if (mongoose.connections[0].readyState !== 1) {
    mongoose.set("debug", process.env.NODE_ENV === "development");
    await connect(dbUrl);
  }
}

mongoose.connection.once("open", () =>
  console.log("Database connected: %s", dbUrl)
);
