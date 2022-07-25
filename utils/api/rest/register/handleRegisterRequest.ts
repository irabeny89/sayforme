import { NextApiResponse } from "next";
import hashPassword from "utils/hashPassword";
import handleRequestError from "../handleRequestError";
import signAndGetToken from "./signAndGetToken";

export default async function handleRequest(
  { password, ...rest }: Record<"username" | "email" | "password", string>,
  res: NextApiResponse
) {
  try {
    // start db connection
    await (await import("utils/db")).default();

    const salt = (await import("crypto")).randomBytes(16).toString("hex"),
      hashNsalt = hashPassword(password, salt),
      // register user as new member or db throws error even when user already exist
      { email, username, role } = await (
        await import("utils/db/models/member")
      ).default.create({ ...rest, ...hashNsalt });

    return res.status(201).end(signAndGetToken({ email, username, role }));
  } catch (error: any) {
    handleRequestError(error, res);
  }
}
