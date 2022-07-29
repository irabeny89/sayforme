import { NextApiResponse } from "next";
import handleRequestError from "utils/api/rest/handleRequestError";
import handleResponse from "./handleResponse";
import startDb from "utils/db";

export default async function handleRequest(
  { email, password }: Record<"email" | "password", string>,
  res: NextApiResponse
) {
  try {
    // start db connection
    await startDb();
    const member = await (await import("utils/db/models/member")).default
      .findOne({ email })
      .select("hashedPassword salt email username role id")
      .exec();

    return await handleResponse(member, password, res);
  } catch (error) {
    handleRequestError(error, res);
  }
}
